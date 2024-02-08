import styled from "styled-components";
import {
  BORDER_RADIUS_20,
  BACKGROUND_COLOR,
  WIDTH
} from "../../constants/styleconstant";

const Menu = () => {
  return (
    <MenuWrapper>
      <MenuItem style={{ height: '100%' }}>
        Ranking
      </MenuItem>
      <MenuItem>
        Schedule
      </MenuItem>
      <MenuItem>
        TeamPage
      </MenuItem>
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  width: ${WIDTH};
  height: 22rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  >:nth-child(n){
    display: flex;
    justify-content: center;
    align-items: center;
  }
  >:nth-child(1){
    grid-area: 1/1/3/2;
  }
`;

const MenuItem = styled.div`
  width: calc((${WIDTH} - 1rem)/2);
  height: calc((${WIDTH} - 1rem)/2);
  border-radius: ${BORDER_RADIUS_20};
  background-color: ${BACKGROUND_COLOR};
`;