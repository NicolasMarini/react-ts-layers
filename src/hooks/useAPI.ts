import { useState } from "react";

export type NewPost = {
  userId: number;
  title: string;
  body: string;
};

type DataState<T> = T extends Array<any> ? T : T | undefined;

export const useAPI = <T>(
  requestFunction: (...args: any[]) => Promise<unknown>
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataState<T>>(undefined as DataState<T>);

  const [error, setError] = useState<unknown>(null);

  console.log("useAPI requestFunction:: ", requestFunction);

  const makeRequest = async (...args: any[]): Promise<void | Error> => {
    try {
      setLoading(true);

      const data = await requestFunction(...args);

      setData(data as DataState<T>);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { makeRequest, loading, data, error };
};
