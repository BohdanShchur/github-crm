import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';

import { Box, Typography, Button } from '@mui/material';
import { loginUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(6, 'Too Short!').required('Required'),
});

type LoginFormInputs = {
  email: string;
  password: string;
};


type LoginProps = {
  onLogin: () => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });


  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data && data.access_token) {
          document.cookie = `access_token=${data.access_token};`;
          onLogin();
      }
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutation.mutate(data);
  };


  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="grey.100">
      <Box width="100%" maxWidth={400} p={4} bgcolor="white" borderRadius={2} boxShadow={3}>
        <Typography variant="h5" fontWeight={700} align="center" mb={2}>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <Typography variant="subtitle2" mb={0.5}>Email</Typography>
            <input
              {...register('email')}
              type="email"
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
            />
            {errors.email && (
              <Typography color="error" variant="caption">{errors.email.message}</Typography>
            )}
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle2" mb={0.5}>Password</Typography>
            <input
              {...register('password')}
              type="password"
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}
            />
            {errors.password && (
              <Typography color="error" variant="caption">{errors.password.message}</Typography>
            )}
          </Box>
          <Box mb={2}>
            <Button type="submit" fullWidth variant="contained" color="primary" disabled={mutation.isPending}>
              {mutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
          {mutation.isError && (
            <Typography color="error" variant="body2" align="center" mb={1}>{(mutation.error as Error).message}</Typography>
          )}
          {mutation.isSuccess && (
            <Typography color="success.main" variant="body2" align="center" mb={1}>Login successful!</Typography>
          )}
        </form>
        <Button variant="text" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/register')}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
