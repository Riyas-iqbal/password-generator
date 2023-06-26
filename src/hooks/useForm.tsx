import { ChangeEvent, ChangeEventHandler, useState } from "react";


export function useForm(initalValues: IValues): [IValues,ChangeEventHandler] {
  const [values, setValues] = useState(initalValues)

  return [
    values,
    (e:ChangeEvent<HTMLInputElement>) => (
      setValues({
        ...values,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
      })
    )
  ]
}

export type IValues = {
  length: number
  capital: boolean
  small: boolean
  number: boolean
  symbol: boolean
}