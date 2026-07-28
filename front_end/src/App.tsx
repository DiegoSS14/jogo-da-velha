import './App.css'

function App() {

  return (
    <body className='relative flex flex-col items-center justify-center min-h-screen p-6 bg-bg mx-auto'>

      <section className='flex flex-col gap-10 justify-center items-center w-full max-w-7xl'>
        <h1 className='text-4xl font-bold text-text-h'>Jogo da velha</h1>
        <div className='w-100 h-100 bg-code-bg rounded-lg flex items-center justify-center'>
          <span className='text-white/10 text-2xl'>Tabela do Jogo da velha</span>
        </div>
      </section>
    </body>
  )
}

export default App
