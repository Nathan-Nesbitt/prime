import React from 'react';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { TextField } from '@material-ui/core';


class Main extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            error: false,
            loading: false,
            prime: null
        }

        this.request = this.request.bind(this);
        this.validate = this.validate.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    validate() {
        if(this.state.input === null) {
            this.setState({"error": true})
            return false;
        }
        
        this.setState({"error": false})
        return true;
    }

    onInputChange(e) {
        this.setState({"input": Math.max(0, parseInt(e.target.value) ).toString().slice(0,16)})
    }

    request() {
        if(this.validate()) {
            this.setState({"prime": null})
            this.setState({"loading": true})

            console.log(`/prime/${this.state.input}`)

            fetch(`/prime/${this.state.input}`)
            .then(response => {
                if (!response.ok)
                    throw new Error(response)
                return response.json();
            }).then(response => {
                console.log(response.result)
                this.setState({"prime": response.result})
                this.setState({"loading": false})
                console.log(this.state)
            })
            .catch(err => {
                console.log(err)
                this.setState({"prime": null})
                this.setState({"loading": false})
            })
        }
    }


    render() {
        
        return(<div className="Main" style={{display: "flex", flexDirection: "column", marginLeft: "20%", marginRight: "20%", marginTop: "20vh"}}>
            {this.state.prime != null ?
                <div style={{textAlign: "center"}}>
                    <p>This number is {this.state.prime}.</p>
                </div> : null
            }

            {this.state.loading ? 
                <div style={{textAlign: "center"}}>
                    <CircularProgress />
                    <p>Doing some hard math... </p>
                </div> : null
            }
            <div style={{display: "flex", flexDirection: "column"}}>
                <TextField
                    id="standard-number"
                    error={this.state.error}
                    label="Your Number"
                    type="number"
                    value={this.state.input}
                    onChange={this.onInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Button variant="contained" color="primary" onClick={this.request}>
                    Check If Prime
                </Button>
            </div>
        </div>)
    }
}

export default Main;