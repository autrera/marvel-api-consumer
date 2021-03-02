import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fill } from '../../slices/characters.slice';
import Config from '../../config';
import CharactersResults from '../CharactersResults';
import PropTypes from 'prop-types';

const ComicCharacters = (props) => {
	const dispatch = useDispatch();

	useEffect(async() => {
    const res = await fetch(`${Config.api.host}/v1/public/comics/${props.id}/characters?apikey=${Config.api.key}`);
    if(res.status >= 400) {
    }
    const json = await res.json();
    if ('data' in json) {
	    dispatch(fill(json.data));
    }
	}, []);

	return(
		<CharactersResults />
	)
}

ComicCharacters.propTypes = {
  id: PropTypes.number.isRequired
};

export default ComicCharacters;
