import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const SubTitle = styled.h2`
  font-size: 40px;
  color: var(--dark);
`

export const Field = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
`

export const Label = styled.label`
  font-size: 20px;
  font-weight: 800;
`

export const Input = styled.input`
    padding: 20px;
    border-radius: 20px;
    background-color: var(--ligth);
    border: 3px solid var(--dark);
    font-weight: 600;
    font-size: 16px;
`
export const Button = styled.button`
    padding: 20px;
    background-color: var(--pink);
    border-radius: 20px;
    border: 3px solid var(--dark);
    font-weight: 800;
    font-size: 20px;
`