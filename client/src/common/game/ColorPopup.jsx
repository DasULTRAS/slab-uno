import "./ColorPopup.css";

export default function Popup({
                                  click = (color) => {
                                  }
                              }) {
    return (<div className="popupBackground">
        <div className="red button" onClick={() => click('red')}/>
        <div className="blue button" onClick={() => click('blue')}/>
        <div className="green button" onClick={() => click('green')}/>
        <div className="yellow button" onClick={() => click('yellow')}/>
    </div>);
};
