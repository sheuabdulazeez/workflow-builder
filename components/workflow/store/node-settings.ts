import { create } from 'zustand'

type NodeSettings = {
  show: boolean,
  data: Record<string, any>,
  setShow: (show: boolean, data?: Record<string, any>) => void
}

const useNodeSettings = create<NodeSettings>((set, get) => ({
  show: false,
  data: {},
  setShow: (show: boolean, data?:Record<string, any>) => set((state) => ({ show, data: data??{} }))
}))

export default useNodeSettings