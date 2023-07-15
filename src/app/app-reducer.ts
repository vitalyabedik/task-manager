export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

type initialStateType = typeof initialState

export const appReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}


// action creators
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)


// types
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>

type ActionsType = SetAppStatusACType | SetAppErrorACType
