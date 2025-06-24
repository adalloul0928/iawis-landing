import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Types for API responses
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
}

export interface ApiError {
  message: string;
  code?: string;
}

// Query Keys
export const queryKeys = {
  users: ["users"] as const,
  user: (id: string) => ["users", id] as const,
  posts: ["posts"] as const,
  post: (id: string) => ["posts", id] as const,
  userPosts: (userId: string) => ["users", userId, "posts"] as const,
};

// Mock API functions - replace with actual API calls
async function fetchUsers(): Promise<User[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      createdAt: new Date().toISOString(),
    },
  ];
}

async function fetchUser(id: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id,
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date().toISOString(),
  };
}

async function fetchPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [
    {
      id: "1",
      title: "First Post",
      content: "This is the first post content",
      userId: "1",
      createdAt: new Date().toISOString(),
    },
  ];
}

async function createPost(data: Omit<Post, "id" | "createdAt">): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
}

async function updatePost(
  id: string,
  data: Partial<Omit<Post, "id" | "createdAt">>,
): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    id,
    title: data.title || "Updated Post",
    content: data.content || "Updated content",
    userId: data.userId || "1",
    createdAt: new Date().toISOString(),
  };
}

async function deletePost(_id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
}

// Query Hooks
export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => fetchUser(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: fetchPosts,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Mutation Hooks
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });

      // Optionally, update the cache optimistically
      queryClient.setQueryData<Post[]>(queryKeys.posts, (old) => {
        return old ? [...old, newPost] : [newPost];
      });
    },
    onError: (error: ApiError) => {
      console.error("Failed to create post:", error);
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Post, "id" | "createdAt">>;
    }) => updatePost(id, data),
    onSuccess: (updatedPost) => {
      // Update the specific post in cache
      queryClient.setQueryData(queryKeys.post(updatedPost.id), updatedPost);

      // Invalidate posts list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
    onError: (error: ApiError) => {
      console.error("Failed to update post:", error);
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, deletedId) => {
      // Remove post from cache
      queryClient.removeQueries({ queryKey: queryKeys.post(deletedId) });

      // Update posts list cache
      queryClient.setQueryData<Post[]>(queryKeys.posts, (old) => {
        return old ? old.filter((post) => post.id !== deletedId) : [];
      });
    },
    onError: (error: ApiError) => {
      console.error("Failed to delete post:", error);
    },
  });
}
