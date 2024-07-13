import * as React from 'react';
import { styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Style from './filter.module.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { GenderOptionsForCharacter, StatusOptionsForCharacter, TypeOptionForCharacter , SpeciesOptionForCharacter} from '../../utils/data';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


type TypeForSelectedFilter = {
    gender: string | null,
    status: string | null,
    species: string | null,
    type: string | null,
}


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: 'white'
            },
        },
    },
}));

export default function Filter() {

    const [anchorElForStatsuFilter, setAnchorElForStatsuFilter] = React.useState<null | HTMLElement>(null);
    const [anchorElForGenderFilter, setAnchorElForGenderFilter] = React.useState<null | HTMLElement>(null);
    const [anchorElForSpeciesFilter, setAnchorElForSpeciesFilter] = React.useState<null | HTMLElement>(null);
    const [anchorElForTypeFilter, setAnchorElForTypeFilter] = React.useState<null | HTMLElement>(null);

    const [filters, setFilters] = React.useState<TypeForSelectedFilter>({
        gender: null,
        status: null,
        species: null,
        type: null
    })

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()


    const openMenuForStatusFilter = Boolean(anchorElForStatsuFilter);
    const openMenuForGenderFilter = Boolean(anchorElForGenderFilter);
    const openMenuForSpeciesFilter = Boolean(anchorElForSpeciesFilter);
    const openMenuForTypeFilter = Boolean(anchorElForTypeFilter);

    const handleClick = (event: React.MouseEvent<HTMLElement>, type: 'status' | 'gender' | 'species' | 'type') => {
        if (type === 'gender')
            setAnchorElForGenderFilter(event.currentTarget);
        if (type === 'status')
            setAnchorElForStatsuFilter(event.currentTarget);
        if (type === 'species')
            setAnchorElForSpeciesFilter(event.currentTarget);
        if (type === 'type')
            setAnchorElForTypeFilter(event.currentTarget);
    };

    const handleClose = (type: 'status' | 'gender' | 'species' | 'type') => {
        if (type === 'gender')
            setAnchorElForGenderFilter(null);
        if (type === 'status')
            setAnchorElForStatsuFilter(null);
        if (type === 'species')
            setAnchorElForSpeciesFilter(null);
        if (type === 'type')
            setAnchorElForTypeFilter(null);
    };

    const handleFilterSelection = (type: 'status' | 'gender' | 'species' | 'type', value: string) => {
        setFilters({
            ...filters,
            [type]: value
        })
        handleClose(type)
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(type, value);
        searchParams.set('page', '1');
        if (location.pathname === '/')
            navigate(`${location.pathname}characters?${searchParams.toString()}`);
        else
            navigate(`${location.pathname}?${searchParams.toString()}`);
    }

    const handleRemoceFilters = () =>{
        setFilters({
            gender : null,
            species : null,
            status : null,
            type : null
        })                
        navigate('/characters')
    }

    React.useEffect(() => {
        const genderFilter: string | null = searchParams.get('gender');
        const statusFilter: string | null = searchParams.get('status');
        const speciesFilter: string | null = searchParams.get('species');
        const typeFilter: string | null = searchParams.get('type');

        setFilters({
            gender: genderFilter ? genderFilter : null,
            status: statusFilter ? statusFilter : null,
            species: speciesFilter ? speciesFilter : null,
            type: typeFilter ? typeFilter : null,
        });
    }, [])

    return (
        <div className={Style['fiter-container']}>
            <div className={Style['filter-icon']}>
                <FilterAltIcon />
            </div>
            <div>
                <div className={Style['fiter-box']} onClick={(e) => handleClick(e, 'gender')}>
                    <ArrowDropDownIcon />
                    <p className={Style['inner-text']}>{filters.gender ? filters.gender : `Select Gender`}</p>
                </div>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorElForGenderFilter}
                    open={openMenuForGenderFilter}
                    onClose={() => handleClose('gender')}
                >
                    {GenderOptionsForCharacter.map((option, index) => {
                        return (
                            <MenuItem onClick={() => handleFilterSelection('gender', option.value)} disableRipple key={index}>
                                {option.value}
                            </MenuItem>
                        )
                    })}
                </StyledMenu>
            </div>
            <div>
                <div className={Style['fiter-box']} onClick={(e) => handleClick(e, 'status')}>
                    <ArrowDropDownIcon />
                    <p className={Style['inner-text']}>{filters.status ? filters.status : `Select Status`}</p>
                </div>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorElForStatsuFilter}
                    open={openMenuForStatusFilter}
                    onClose={() => handleClose('status')}
                >
                    {StatusOptionsForCharacter.map((option, index) => {
                        return (
                            <MenuItem onClick={() => handleFilterSelection('status', option.value)} disableRipple key={index}>
                                {option.value}
                            </MenuItem>
                        )
                    })}
                </StyledMenu>
            </div>
            <div>
                <div className={Style['fiter-box']} onClick={(e) => handleClick(e, 'species')}>
                    <ArrowDropDownIcon />
                    <p className={Style['inner-text']}>{filters.species ? filters.species : `Select Species`}</p>
                </div>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorElForSpeciesFilter}
                    open={openMenuForSpeciesFilter}
                    onClose={() => handleClose('species')}
                >
                    {SpeciesOptionForCharacter.map((option, index) => {
                        return (
                            <MenuItem onClick={() => handleFilterSelection('species', option.value)} disableRipple key={index}>
                                {option.value}
                            </MenuItem>
                        )
                    })}
                </StyledMenu>
            </div>
            <div>
                <div className={Style['fiter-box']} onClick={(e) => handleClick(e, 'type')}>
                    <ArrowDropDownIcon />
                    <p className={Style['inner-text']}>{filters.type ? filters.type : `Select Type`}</p>
                </div>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorElForTypeFilter}
                    open={openMenuForTypeFilter}
                    onClose={() => handleClose('type')}
                >
                    {TypeOptionForCharacter.map((option, index) => {
                        return (
                            <MenuItem onClick={() => handleFilterSelection('type', option.value)} disableRipple key={index}>
                                {option.value}
                            </MenuItem>
                        )
                    })}
                </StyledMenu>
            </div>
            {(filters.gender || filters.species || filters.status || filters.type )  && 
            (<div className={Style['remov-filter-icon']} onClick={handleRemoceFilters}>
                <FilterAltOffIcon />
            </div>)}
        </div>
    );
}
