import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error) {
      this.setState({ hasError: true });
      console.log(error);
    }
  
    render() {
      if (this.state.hasError) {
        return (
        <div className="error-body">
        <p className="error-info">&gt;Oh No! Nozama is sad! Internally sad!</p>
        <h1 className="internal"><span className="five">5</span><span className="zero">0</span><span className="zero">0</span></h1>
        <footer className="error-link"><a href="https://www.altreiter.at">altreiter.at</a></footer>
        </div>

        )
        ;
      }
      return this.props.children;
    }
  }