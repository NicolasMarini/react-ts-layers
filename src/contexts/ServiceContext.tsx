import React, { createContext, useContext } from "react";
import { PostService } from "../services/PostService";
import { PostRepository } from "../repositories/PostRepository";
import { ApiClient } from "../models/ApiClient";
import { HOST } from "../properties";
import { PostModel } from "../models/PostModel";

interface ServiceContextType {
  postService: PostService;
  // postRepository: PostRepository;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
};

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const postRepository = new PostRepository(new ApiClient(HOST));
  const postService = new PostService(postRepository);

  return (
    <ServiceContext.Provider value={{ postService }}>
      {children}
    </ServiceContext.Provider>
  );
};
