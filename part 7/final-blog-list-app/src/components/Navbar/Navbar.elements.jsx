import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Nav = styled.nav`
  background-color: var(--dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--ligth);
  padding: 20px;
`
export const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--ligth);

  &:hover {
    color: var(--blue);
  }
`

export const NavLogo = styled(NavLink)`
  color: var(--pink);
  font-size: 20px;
  font-weight: 900;
`

export const InfoText = styled.span`
  color: var(--yellow);
`
