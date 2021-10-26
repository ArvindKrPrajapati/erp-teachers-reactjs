



  import { Link } from 'react-router-dom';
 
   function MyClass({myClass}){
     return(
        <section className="row mt-3">
         <article className="col">
          <h3>My Classes</h3>
           <div className="table-responsive mb-4">
            <table className="table">
                <thead>
                  <tr>
                    <th scope="col" width="50px">Subject</th>
                    <th scope="col">Batch/Branch</th>
                    <th scope="col" width="100px">Action</th>
                 </tr>
                </thead>
                <tbody>
                  {
                    myClass.map((s)=>{
                      return (
                      <tr>
                    <td>{s.subject}</td>
                    <td>{s.batch+"/"+s.branch}</td>
                    <td><Link to={`/dashboard/${s.id}`} className="btn btn-success btn-sm">Manage</Link></td>
                     </tr> )
                    })
                  }
                </tbody>
            </table>
            </div>
         </article>
        </section>
       );
   }
   
   export default MyClass;