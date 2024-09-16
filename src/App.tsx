import { useState, useEffect } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";

import { Loading } from "./components/Loading";

interface DataType {
  id: number,
  date_start: number,
  date_end: number,
  title: string,
  place_of_origin: string,
  inscriptions: string,
  artist_display: string
}

interface dataInfoType {
  total: number,
  limit: number,
  offset: number,
  total_pages: number,
  current_page: number,
  next_url: string
}

function App() {
  const [filteredData, setFilteredData] = useState<DataType[] | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<any>(null);
  const [dataInfo, setDataInfo] = useState<dataInfoType | null>(null);
  const [first, setFirst] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async (first: number) => {
    try {
      setLoading(true);
      let temp: DataType[] = [];
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${ first }`).then((res) => res.json());
      setDataInfo(response.pagination);

      response.data.map((item: DataType) => {
        temp.push({
          id: item.id,
          title: item.title,
          place_of_origin: item.place_of_origin,
          artist_display: item.artist_display,
          inscriptions: item.inscriptions,
          date_start: item.date_start,
          date_end: item.date_end
        });
        setFilteredData(temp);
        setLoading(false);
      });
    }
    catch(error) {
      console.log(error);
    }
  };

  const handlePageChange = async(event: any) => {
    const newFirst = event.first + 1;
    setFirst(newFirst);
    await getData(newFirst);
  };

  useEffect(() => {
    getData(first);
  }, []);

  if(loading) {
    return <Loading />
  }

  return (
    <div className="px-40 py-20">
      { filteredData &&
        <div 
          className="p-10 border-2 rounded-md shadow-md"
        >
          <DataTable
            selectionMode={'checkbox'}
            selection={ selectedProducts }
            onSelectionChange={(e: any) => setSelectedProducts(e.value)}
            value={ filteredData }
            tableStyle={{ minWidth: "50rem" }}
            paginator={ false }
            rows={ 1 }
            className="mb-10"
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
            <Column field="title" header="Title"></Column>
            <Column field="place_of_origin" header="Origin"></Column>
            <Column field="artist_display" header="Artist Display"></Column>
            <Column field="inscriptions" header="Inscriptions"></Column>
            <Column field="date_start" header="Start Date"></Column>
            <Column field="date_end" header="End Date"></Column>
          </DataTable>
          <Paginator
            first={ first }
            rows={ 1 }
            template={{ layout: 'FirstPageLink PageLinks LastPageLink' }}
            totalRecords={ dataInfo?.total_pages }
            onPageChange={ handlePageChange }
            className="text-xl gap-x-4 text-center mt-4"
          >
          </Paginator>
        </div>
      }
    </div>
  )
}

export default App
