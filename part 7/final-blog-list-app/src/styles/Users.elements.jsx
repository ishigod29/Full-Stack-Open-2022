import styled from 'styled-components'

export const UsersContainer = styled.section`
  padding: 20px;
`

export const SubTitle = styled.h2`
  font-size: 40px;
`

export const Table = styled.table`
  display: flex;
  flex-direction: column;
  border: 3px solid var(--dark);
  border-radius: 20px;
  padding: 20px;

  & tbody, thead{
    display: flex;
    flex-direction: column;

    & tr{
        display: flex;
        border-bottom: 2px solid var(--dark);
        padding: 10px;
        justify-content: space-between;
    }
  }
`
