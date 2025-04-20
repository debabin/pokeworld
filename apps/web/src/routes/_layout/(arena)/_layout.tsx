import {
  createFileRoute,
  Outlet
} from '@tanstack/react-router'

const ArenaGroupLayout = () => (
  <div>
    <div id='arena' />
    <Outlet />
  </div>
)

export const Route = createFileRoute('/_layout/(arena)/_layout')({
  component: ArenaGroupLayout,
})
