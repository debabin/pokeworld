import { createFileRoute } from '@tanstack/react-router'

let injected = false;

export const Route = createFileRoute('/_layout/(arena)/_layout/battles/')({
  loader: async () => {
    console.log('@loader');
    if (injected) return

    const { init } = await import('../-helpers/init')
    await init()
    injected = true
  },
  pendingComponent: () => {
    console.log('@@@pendingComponent')
    return <div>loading</div>
  },
})
