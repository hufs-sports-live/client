'use client';

import { ChangeEvent, useState } from 'react';

import Button from '@/components/common/Button';
import useValidate from '@/hooks/useValidate';
import usePostLoginMutation from '@/queries/admin/auth/usePostLoginMutation';
import { AuthPayload } from '@/types/auth';

export default function Login() {
  const [loginData, setLoginData] = useState<AuthPayload>({} as AuthPayload);

  const { mutate, status } = usePostLoginMutation();

  const { isError: isEmailEmpty } = useValidate(
    loginData.email,
    emailValue => !emailValue,
  );
  const { isError: isPasswordEmpty } = useValidate(
    loginData.password,
    pwValue => !pwValue,
  );
  const isAnyInvaild = isEmailEmpty || isPasswordEmpty;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const loginSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    mutate(loginData);
  };
  return (
    <div className="space-y-8 py-8">
      <div className="text-2xl font-medium">관리자 로그인</div>
      <form onSubmit={loginSubmitHandler} className="flex flex-col gap-4">
        <label>
          <div className="flex items-center justify-between">
            <span>아이디</span>
            {isEmailEmpty && (
              <span className="text-sm text-red-400">필수 항목입니다.</span>
            )}
          </div>
          <input
            name="email"
            type="text"
            value={loginData.email}
            onChange={handleInput}
            className="mt-2 block w-full rounded-lg border border-gray-3/70 bg-secondary/25 p-4"
            required
          />
        </label>
        <label>
          <div className="flex items-center justify-between">
            <span>비밀번호</span>
            {isPasswordEmpty && (
              <span className="text-sm text-red-400">필수 항목입니다.</span>
            )}
          </div>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInput}
            className="mt-2 block w-full rounded-lg border border-gray-3/70 bg-secondary/25 p-4"
            required
          />
        </label>

        {status === 'pending' && (
          <div className="mx-2 text-gray-4">로그인 중입니다...</div>
        )}
        {status === 'error' && (
          <div className="mx-2 text-red-600">
            로그인에 실패하였습니다. 다시 시도하시거나 관리자에게 문의해주세요.
          </div>
        )}
        <Button
          className="mt-8 w-full rounded-lg bg-primary p-4 text-xl text-white hover:bg-[#303ECE] disabled:bg-gray-2 disabled:text-gray-4"
          type="submit"
          disabled={isAnyInvaild}
        >
          로그인하기
        </Button>
      </form>
    </div>
  );
}
