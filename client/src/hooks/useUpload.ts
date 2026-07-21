import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseApi } from '../api/parseApi';
import { useStatement } from '../context/StatementContext';
import toast from 'react-hot-toast';

export function useUpload() {
  const [progress, setProgress] = useState<number>(0);
  const { setStatementData, setIsLoading, setError } = useStatement();
  const navigate = useNavigate();

  const uploadFile = async (file: File) => {
    // Validate format
    const validExts = ['.xlsx', '.xls', '.csv'];
    const fileName = file.name.toLowerCase();
    const isValid = validExts.some(ext => fileName.endsWith(ext));

    if (!isValid) {
      const err = 'Invalid file type. Only Excel (.xlsx, .xls) and CSV (.csv) files are supported.';
      toast.error(err);
      setError(err);
      return;
    }

    // Validate size (20MB)
    if (file.size > 20 * 1024 * 1024) {
      const err = 'File size exceeds the 20MB maximum limit.';
      toast.error(err);
      setError(err);
      return;
    }

    setIsLoading(true);
    setProgress(30);
    const toastId = toast.loading('Uploading and analyzing statement...');

    try {
      setProgress(60);
      const result = await parseApi.uploadAndParse(file);
      setProgress(100);

      setStatementData(result, file.name);
      toast.success(`Successfully parsed statement from ${result.bank}!`, { id: toastId });
      navigate('/dashboard');
    } catch (err: any) {
      const message = err.message || 'Failed to process statement file.';
      toast.error(message, { id: toastId });
      setError(message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return { uploadFile, progress };
}
