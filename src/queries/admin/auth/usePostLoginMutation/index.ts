import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postLogin } from '@/api/auth';
import { ADMIN_MUTATION_KEY } from '@/constants/admin/mutationKey';
import LocalStorage from '@/utils/LocalStorage';

export default function usePostLoginMutation() {
  const router = useRouter();

  return useMutation({
    mutationKey: [ADMIN_MUTATION_KEY.POST_LOGIN],
    mutationFn: postLogin,
    onSuccess: ({ access }) => {
      LocalStorage.setItem('token', access);

      router.push('/admin/league');
    },
  });
}
