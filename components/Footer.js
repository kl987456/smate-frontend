export default function Footer(){
  return (
    <footer style={{background:'#001529',color:'#fff',padding:20,marginTop:40}}>
      <div className="container" style={{textAlign:'center'}}>
        © {new Date().getFullYear()} SMATE — Built for Lief task
      </div>
    </footer>
  );
}
