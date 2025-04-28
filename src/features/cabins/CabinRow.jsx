import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleteing, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;
  
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }
  


  return (
    <Table.Row>
      <Img src={image} />
      <Cabin role="cell">{name}</Cabin>
      <div role="cell">{maxCapacity} guests</div>
      <Price role="cell">{formatCurrency(regularPrice)}</Price>
      <Discount role="cell">{ discount>0 ? formatCurrency(discount) : "-"}</Discount>
      <div>

        <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button onClick={handleDuplicate} icon = {<HiSquare2Stack/>}> Duplicate</Menus.Button>   
            <Modal.Open opens="edit">
          <Menus.Button icon = {<HiPencil/>}> Edit</Menus.Button>
          </Modal.Open>
            <Menus.Button  icon = {<HiTrash/>}onClick={() => deleteCabin(cabinId)}> Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>


      </div>
    </Table.Row>
  );
}

export default CabinRow;
