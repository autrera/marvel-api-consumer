import React, { useState, useEffect } from 'react';
import {
  TextField,
	CircularProgress
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

function RemoteAsyncAutocomplete(props) {
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (searchTerm === "") {
			return
		}
    const delayDebounceFn = setTimeout(async() => {
    	setLoading(true);
	    const res = await fetch(props.url + searchTerm);
	    if(res.status >= 400) {
	    }
	    const json = await res.json();
	    if ('data' in json) {
	    	setOptions(json.data.results.map(result => ({
	    		id: result.id,
	    		text: result[props.textField],
	    	})));
	    }
    	setLoading(false);
    }, 250);

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  return(
    <Autocomplete
      id={props.id}
      multiple={props.multiple || false}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={option => option.text}
      options={options}
      loading={loading}
      onKeyUp={event => {setSearchTerm(event.target.value);}}
      onChange={(event, value) => {
        props.onChange(value);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export default RemoteAsyncAutocomplete;
