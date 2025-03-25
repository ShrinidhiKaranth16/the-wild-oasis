import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";


function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  console.log(cabins);

  const filterValue = searchParams.get("discount") || "all";
  const sortByValue = searchParams.get("sortBy") || "name-asc";

  let filteredCabins;
  if(filterValue === "all") {
    filteredCabins = cabins;
  }else if(filterValue === "no-discount") {
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  }else if(filterValue === "with-discount") {
    filteredCabins = cabins.filter(cabin => cabin.discount > 0);
  }

  const [sortByField, sortByOrder] = sortByValue.split("-");
  const modifier = sortByOrder === "asc" ? 1 : -1;
  filteredCabins.sort((a, b) => (a[sortByField] - b[sortByField]) * modifier);


  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
