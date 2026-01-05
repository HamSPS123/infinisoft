import { format } from 'date-fns';

/**
 * Format date to dd/MM/yyyy HH:mm:ss
 */
export const formatDateTime = (date: string | Date | undefined | null): string => {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'dd/MM/yyyy HH:mm:ss');
  } catch (error) {
    console.error('Error formatting date:', error);
    return '-';
  }
};

/**
 * Format date to dd/MM/yyyy
 */
export const formatDate = (date: string | Date | undefined | null): string => {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'dd/MM/yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return '-';
  }
};

/**
 * Format time to HH:mm:ss
 */
export const formatTime = (date: string | Date | undefined | null): string => {
  if (!date) return '-';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'HH:mm:ss');
  } catch (error) {
    console.error('Error formatting time:', error);
    return '-';
  }
};
