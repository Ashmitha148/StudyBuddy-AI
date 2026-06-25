function Button(){
    function handleClick(){
        alert("Button Clicked!");
    }
     return (
        <button onClick ={handleClick}>Click Me</button>
     );
}
export default Button;