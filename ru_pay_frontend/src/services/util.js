import { format } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm:ss');
};


export const sortTableContentByDate = (content, order) => {
  return [...content].sort((a, b) => {
    const dateA = new Date(a.created_at.split('/').reverse().join('-'));
    const dateB = new Date(b.created_at.split('/').reverse().join('-'));
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};