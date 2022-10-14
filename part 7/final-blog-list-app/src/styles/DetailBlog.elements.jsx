import styled from 'styled-components'

export const DetailBlogContainer = styled.section`
  padding: 20px;
`

export const SubTitle = styled.h2`
  font-size: 40px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Field = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
`

export const CommentContainer = styled.div`
  padding: 20px;
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

export const ButtonSelectorLeft = styled.button`
    padding: 20px;
    background-color: var(--pink);
    border: 3px solid var(--dark);
    border-radius: 20px 0 0 20px;
    font-weight: 800;
    font-size: 20px;
`

export const ButtonSelectorRigth = styled.button`
    padding: 20px;
    background-color: var(--pink);
    border: 3px solid var(--dark);
    border-radius: 0 20px 20px 0;
    font-weight: 800;
    font-size: 20px;
`
