/**
 * Component for listing all characters with filters and search option
 */


import Style from './character-list.module.css'
import { useEffect } from 'react'
import { ServicesForCharactersList } from '../../Services/ServicesForCharactersList'
import CharacterCard from '../../components/CharachterCard/CharacterCard';
import { useState } from 'react';
import { TypeofCharListForDashboard } from '../../utils/type';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Filter from '../../components/Filter/Filter';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from '@mui/material/Skeleton';
import InvalidRequest from '../../components/InvalidRequest/InvalidRequest';

type TypeForSelectedFilter = {
  gender: string | null,
  status: string | null,
}

export default function CharactersList() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  const [charactersArray, setCharactersArray] = useState<TypeofCharListForDashboard | null>(null)
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [isInvalidRequest, setIsInvalidRequest] = useState<boolean>(false);


  const [selectedFilters, setSelctedFilters] = useState<TypeForSelectedFilter>({
    gender: null,
    status: null
  })


  /**
   * Function for fetching initial recoerd of charcter without any filter
   * @param page - page number for pagination
   */
  const fetchCharacters = async (page: number) => {
    try {
      const charachtersSet = await ServicesForCharactersList.getCharactersForDashboard(page);
      setCharactersArray(charachtersSet);
    } catch (error) {
      setIsInvalidRequest(true);
    }
  }

  /**
   * Function for filter character listing .
   */
  const filterCharacters = async () => {
    try {
      setCharactersArray(null);
      const searchParams = new URLSearchParams(location.search);
      const charachtersSet = await ServicesForCharactersList.filterChracters(searchParams.toString());
      setCharactersArray(charachtersSet);
    } catch (error) {
      setIsInvalidRequest(true);
    }
  }

  const handlePagination = (_event: any, value: any) => {
    setCharactersArray(null);
    setcurrentPage(value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', value);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  /**
   * Function for handle Search operation while page reload or with direct URL with filtered query . 
   * @param search Search query
   * @param page  page number for pagination , if you don't provided 
   * it will consider as 1 default.
   */
  const fetchCharacterBySearchQuery = async (search: string, page: string | null) => {
    setSearchQuery(search);
    setCharactersArray(null);
    (document.getElementById('search-input') as HTMLInputElement).value = search
    try {
      const charachtersSet = await ServicesForCharactersList.fetchSearchedCharacters(search, page ? parseInt(page) : 1);

      setCharactersArray(charachtersSet);
    } catch (error) {
      setSearchQuery(null);
      setIsInvalidRequest(true);
    }
  }

  /**
   * Function for handle search operation from searchbox.
   * @param event 
   */
  const handleSearch = (event: any) => {
    event.preventDefault();
    const searchVlaue = (document.getElementById('search-input') as HTMLInputElement).value;
    navigate(`/characters?search=${searchVlaue}`)
  }
  
  const removeSearchQuery = () => {
    (document.getElementById('search-input') as HTMLInputElement).value = '';
    setSearchQuery(null);
    navigate(`/characters`)
  }

  useEffect(() => {
    const currentPageInUrl: string | null = searchParams.get('page');
    const genderFilter: string | null = searchParams.get('gender');
    const statusFilter: string | null = searchParams.get('status');
    const TypeFilter: string | null = searchParams.get('type');
    const speciesFilter: string | null = searchParams.get('species');
    const searchFilter: string | null = searchParams.get('search');


    if (currentPageInUrl && !genderFilter && !statusFilter && !speciesFilter && !TypeFilter && !searchFilter) {
      fetchCharacters(parseInt(currentPageInUrl));
    } else if (genderFilter || statusFilter || speciesFilter || TypeFilter) {
      filterCharacters()
    } else if (searchFilter) {
      fetchCharacterBySearchQuery(searchFilter, currentPageInUrl);
    } else {
      fetchCharacters(currentPage);
    }

    /** Set Filter Options */

    if (genderFilter || statusFilter) {
      setSelctedFilters({
        ...selectedFilters,
        gender: genderFilter ? genderFilter : null,
        status: statusFilter ? statusFilter : null,
      })
    }

    /**  Set Pagination State when page get refresh */
    if (currentPageInUrl) setcurrentPage(parseInt(currentPageInUrl));
  }, [searchParams])


  return (
    <>
      {/* Filter & Search-tab  */}
      <div className={Style['nav-tab']}>
        <div className={Style['nav-tab-container']}>
          {/*Filters  */}
          <div className={Style['filters-container']}>
            <Filter />
          </div>
          {/* Search bar */}
          <div className={Style['searchbar-container']}>
            <form action='/characters' method='GET' className={Style['form']} onSubmit={handleSearch}>
              <div className={Style['input-wrap']}>
                <SearchIcon className={Style.icon} />
                <input type='text' name="search" id='search-input'
                  className={Style['input']} placeholder='Search character name here .....'
                ></input>
                {searchQuery && (<CloseIcon className={Style.icon} onClick={removeSearchQuery} />)}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Character's Listing */}
      {!isInvalidRequest && (<div className={Style.list}>
        {charactersArray && charactersArray.characters.map((item, index) => {
          return (
            <CharacterCard charachter={item} key={index} />
          )
        })}
        {!charactersArray && [1, 2, 3, 4, 5, 6, 7, 8].map((_item , index) => {
          return (
            <div className={Style['charcter-skelton']} key={index}>
              <Skeleton
                sx={{ bgcolor: 'grey.900', borderRadius: '10px' }}
                variant="rectangular"
                width='100%'
                height='100%'
              />
            </div>
          )
        })}
      </div>)}
      {/* Pagination */}
      {!isInvalidRequest && (<div className={Style['pagination-container']}>
        <Stack spacing={2}>
          <Pagination
            count={charactersArray?.info.pages}
            page={currentPage}
            color="primary"
            size="large"
            onChange={handlePagination}
            className={Style['text-white']}
          />
        </Stack>
      </div>)}
      {isInvalidRequest && (
        <InvalidRequest/>
      )}
    </>
  )

}
