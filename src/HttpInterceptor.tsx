import React, { useEffect, ReactNode } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface HttpInterceptorProps {
  children: ReactNode;
}

export const HttpInterceptor: React.FC<HttpInterceptorProps> = ({
  children,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [t]);

  return <>{children}</>;
};

export default HttpInterceptor;
