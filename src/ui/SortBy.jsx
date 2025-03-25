import Select from './Select'
import { useSearchParams } from 'react-router-dom'

export default function SortBy({options}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  function handleChange(event) {
    searchParams.set('sortBy', event.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select options={options} onChange= {handleChange} value={sortBy} />
  )
}
