import { useQuery } from '@tanstack/react-query'
import { fetchPing } from '../../apis/fetchPing'

export function usePing() {
  const { data, isLoading } = useQuery({
    queryKey: ['ping'],
    queryFn: fetchPing,
    staleTime: 5000,
  })

  return { data, isLoading }
}
