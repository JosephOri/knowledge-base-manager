import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Article } from '../types/Article';
import { queryClient } from '../main';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const useArticles = () => {
  return useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data } = await api.get('/articles');
      return data;
    },
  });
};

export const useArticle = (id: string) => {
  return useQuery<Article>({
    queryKey: ['article', id],
    queryFn: async () => {
      const { data } = await api.get(`/articles/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: (newArticle: Omit<Article, 'id'>) => api.post('/articles', newArticle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useUpdateArticle = () => {
  return useMutation({
    mutationFn: (updatedArticle: Article) => api.put(`/articles/${updatedArticle.id}`, updatedArticle),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', variables.id] });
    },
  });
};

export const useDeleteArticle = () => {
  return useMutation({
    mutationFn: (id: string) => api.delete(`/articles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};
