import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

const ArenaPage = () => {
  useEffect(() => {
    console.log('@render vue')
    const init = async () => {
      console.log('@@@init')
      const { init } = await import('../-helpers/init')
      await init()
    }
    init()
  }, [])

  return <div id="arena"> arena </div>
}

export const Route = createLazyFileRoute(
  '/_layout/(arena)/_layout/battles/index2',
)({
  component: ArenaPage,
})
