import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { Pokedex } from './pokedex'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Pokedex />
      </QueryClientProvider>
    </>
  )
}

export default App
