import './style.css'
import { useEffect, useState } from 'react'
import { useForm } from './hooks/useForm'
import { getRandomChar, getSpecialChar } from './generate/getRandomChar'
import { FaClipboard } from 'react-icons/fa'
import { MdOutlineClear } from 'react-icons/md'
import { toast } from 'react-hot-toast'

function App() {
  const [values, setValues] = useForm({
    length: 6,
    capital: false,
    small: false,
    number: false,
    symbol: false
  })

  useEffect(() => {
    toast.dismiss()
    toast.error('Did you know that over 80% of data breaches occur due to weak or reused passwords', {
      duration: 4000
    })
  }, [])

  const [result, setResult] = useState('')

  const fieldsArray = [
    {
      field: values.capital,
      getChar: () => getRandomChar(65, 90)
    },
    {
      field: values.small,
      getChar: () => getRandomChar(97, 122)
    },
    {
      field: values.number,
      getChar: () => getRandomChar(48, 57)
    },
    {
      field: values.symbol,
      getChar: () => getSpecialChar()
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    toast.dismiss()
    e.preventDefault();
    let generatedPassword: string = '';
    const checkedFields = fieldsArray.filter(({ field }) => field)

    for (let i = 0; i < values.length; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);
      console.log(checkedFields[index], index)

      const letter = checkedFields[index]?.getChar()

      if (letter) {
        generatedPassword += letter;
      }
    }

    if (generatedPassword) {
      toast.success('Well! Well! Look who got a strong password', {
        duration: 3000
      })
      setResult(generatedPassword)
    } else {
      toast.error('Please select at least one option')
    }
  }

  const handleClear = () => {
    toast.dismiss()
    if (!result) {
      toast.error('Well its time for you to get some glasses')
      return 
    }
    toast.success('Hopefully you like the next one')
    setResult('')
  }

  const handleClipboard = async () => {
    toast.dismiss()
    if (!result) {
      toast.error('No text to copy')
      return
    }
    await navigator.clipboard.writeText(result);
    toast.success('Text Copied to clipboard');
  }

  return (
    <section>
      <div className="container">
        <form id='pg-form' onSubmit={handleSubmit}>
          <div className="result">
            <input
              type="text"
              id='result'
              placeholder='Min 6 Characters'
              readOnly
              value={result}
            />
            <div className='clipboard' onClick={handleClipboard}>
              <FaClipboard />
            </div>
          </div>
          <div>
            <div className="field">
              <label htmlFor="length">Length</label>
              <input
                type="number"
                id="length"
                min={6}
                max={10}
                name='length'
                onChange={setValues}
                value={values.length}
              />
            </div>
            <div className="field">
              <label htmlFor="capital">Capital</label>
              <input
                type="checkbox"
                role='switch'
                id='capital'
                name='capital'
                onChange={setValues}
                checked={values.capital} />
            </div>
            <div className="field">
              <label htmlFor="small">Small</label>
              <input
                type="checkbox"
                role='switch'
                id='small'
                name='small'
                onChange={setValues}
                checked={values.small}
              />
            </div>
            <div className="field">
              <label htmlFor="number">Number</label>
              <input
                type="checkbox"
                role='switch'
                id='number'
                name='number'
                onChange={setValues}
                checked={values.number}
              />
            </div>
            <div className="field">
              <label htmlFor="symbol">Symbol</label>
              <input
                role='switch'
                type="checkbox"
                id='symbol'
                name='symbol'
                onChange={setValues}
                checked={values.symbol}
              />
            </div>
          </div>
          <div className='btn-group'>
            <button type='submit'>Generate Password</button>
            <button className='clear' type='button' onClick={handleClear}>
              <MdOutlineClear />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default App