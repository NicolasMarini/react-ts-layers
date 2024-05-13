import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { POSTS } from "../properties";

class APIError extends Error {
  protected errorType: string;

  constructor(message: string, errorType: string) {
    super(message);
    this.errorType = errorType;
  }
}

export class PostAPIError extends APIError {
  constructor(message: string, errorType: string) {
    super(message, errorType);
  }

  getErrorType() {
    if (this.errorType === "PostRequest") {
      throw new Error("Error creating the Post!");
    }
  }
}

const getError = (error: APIError) => {
  console.log("ERROR TO SHOW:: ", error);
  // if (
  //   error.config?.method?.toUpperCase() === "POST" &&
  //   error.config?.url?.endsWith(POSTS)
  // ) {
  //   console.log("Error in creating a post:", error);
  //   throw new PostAPIError("Failed to create post", "PostRequest");
  // }

  // if (
  //   error.config?.method?.toUpperCase() === "GET" &&
  //   error.config?.url?.endsWith(POSTS)
  // ) {
  //   console.log("Error in getting the posts:", error);
  //   throw new PostAPIError("Failed to get the posts", "PostRequest");
  // }
};

export class ApiClient {
  private baseURL: string;
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    this.axiosInstance = axios.create({
      baseURL,
    });

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.config?.url?.endsWith(POSTS)) {
          console.log("intercepting error:: ", error);
          getError(new PostAPIError("Failed to create post", "PostRequest"));
        }

        if (
          error.config?.method?.toUpperCase() === "POST" &&
          error.config?.url?.endsWith(POSTS)
        ) {
          console.log("Error in creating a post:", error);
          throw new PostAPIError("Failed to create post", "PostRequest");
        }

        if (
          error.config?.method?.toUpperCase() === "GET" &&
          error.config?.url?.endsWith(POSTS)
        ) {
          console.log("Error in getting the posts:", error);
          throw new PostAPIError("Failed to get the posts", "PostRequest");
        }

        return Promise.reject(error);
      }
    );
  }

  public async getById<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.get<T>(
      `${this.baseURL}${url}`,
      config
    );

    return response.data;
  }

  public async post<T, U>(
    url: string,
    data: U,
    config?: AxiosRequestConfig
  ): Promise<T | Error> {
    try {
      // throw new AxiosError("Failed to create post", undefined, undefined, true);

      const response: AxiosResponse<T> = await this.axiosInstance.post<T>(
        `${this.baseURL}${url}`,
        data,
        config
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw new PostAPIError("Failed to create post", "PostRequest");
      throw error;
    }
  }
}
