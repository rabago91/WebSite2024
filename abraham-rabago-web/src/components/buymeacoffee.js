const BuyMeACoffee = ({ isAnimationCompleted }) => {
  if (isAnimationCompleted) {
    return (
      <div
        style={{
          position: "absolute",
          top: "0",
          width: "100vw",
          height: "100%",
          left: "0px",
          pointerEvents: 'none',
          //   backgroundColor: "red",
        }}
      >
        <div
          className="coffee, show"
          style={{
            position: "absolute",
            bottom: "0px",
            padding: "5vh",
            textDecoration: "none",
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: "1em",
            width: "calc(100% - 10vh)",
            color: 'mediumvioletred'
            // backgroundColor: "blueviolet",
          }}
        >
          Making indie games and aiming for coolness.<span> </span>
          <a href="https://www.buymeacoffee.com/rabago91t" target="_blank" style={{pointerEvents: 'all',}}>Buy me a <span style={{fontStyle:'italic'}}>coffee</span></a>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="coffee, hide"
          style={{
            position: "absolute",
            backgroundColor: "red",
            bottom: "10px",
            padding: "10px",
          }}
        >
          loading
        </div>
      </div>
    );
  }
};

export default BuyMeACoffee;
