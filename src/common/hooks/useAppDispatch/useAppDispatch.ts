import { useDispatch } from "react-redux"
import { AppDispatch } from "app/model/store"

export const useAppDispatch = () => useDispatch<AppDispatch>()
