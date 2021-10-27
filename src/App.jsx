const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

const Max = 25;
const headers = ['N0.','Name','Phone Number','Time'];


/*-------------------- Slot -------------------------*/
class DisplayFreeSlots extends React.Component {
  render() {
    const listLen = (Max-this.props.waitinglist.length>=0)?Max-this.props.waitinglist.length:0;
    return (
      <div>
          <p>Current free slots available: {listLen}</p>
      </div>
    );
  }
}
/*-------------------- Table -------------------------*/
class CustomerRow extends React.Component {
  render() {
    const customer = this.props.customer;
    return (
      <tr>
        <td>{customer.id}</td>
        <td>{customer.name}</td>
        <td>{customer.phone}</td>
        <td>{customer.time.toLocaleString()}</td>
      </tr>
    );
  }
}

class CustomersTable extends React.Component {
  render() {
    const customerRows = this.props.waitinglist.map(customer =>
      <CustomerRow key={customer.id} customer={customer} />
    );

    return (
      <table className="customer-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>PhoneNumber</th>
            <th>Timer</th>
          </tr>
        </thead>
        <tbody>
          {customerRows}
        </tbody>
      </table>
    );
  }
}
/* -----------------Addcustomer --------------------*/
class AddCustomer extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.cusAdd;
    var newDate = new Date();
    const customer = {
      name: form.name.value, phone: form.phone.value, 
    }
    this.props.pushCustomer(customer);
    form.name.value = ""; form.phone.value = "";
  }

  render() {
    return (
      <form name="cusAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="phone" placeholder="Phone Number" />
        <button>Add a customer</button>
      </form>
    );
  }
}

/*------------- DeleteCustomer--------------------- */
class DeleteCustomer extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.cusDelete;
    const id = form.id.value;
    this.props.deleteCustomer(id);
    form.id.value = "";
  }

  render() {
    return (
      <form name="cusDelete" onSubmit={this.handleSubmit}>
        <input type="text" name="id" placeholder="Customer ID" />
        <button>Delete a customer</button>
      </form>
    );
  }
}

/*------------------ graphQLFetch -------------------*/
async function graphQLFetch(query,variables={}){
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}


/* --------------MainStructer----------------- */
class WaitList extends React.Component {
  constructor() {
    super();
    this.state = { waitinglist: []};
    this.pushCustomer = this.pushCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      waitlist {
        id name phone time
      }
    }`;
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ waitinglist: data.waitlist });
    }
  }
  
  async pushCustomer(customer) {
    if(customer.name==''|customer.phone=='')
    {
      alert('Error: Wrong input, please recheck!');
    }
    else{
      const query = `mutation customerAdd($customer: newCustomer!) {
        customerAdd(customer: $customer) {
          id name phone time
        }
      }`;

      const data = await graphQLFetch(query, {customer});
      if (data) {
        this.loadData();
      }
      if (this.state.waitinglist.length<=25){alert('submit sucessful!')}
      else{alert('Error: exceed max entries!')}
    }
  }

  async deleteCustomer(id) {
    if(id==''){alert('Error: Wrong input!');}
    else{
      if (this.state.waitinglist.length==0){alert('Error: No customer is waiting, Please recheck!')}
      else
      {
        const query = `mutation customerDelete($id: Int!) {
          customerDelete(id: $id) {
            id name phone time
          }
        }`;
        const data = await graphQLFetch(query, {id});
        if (data) {
          this.loadData();
        }
      }
    }
  }


  render() {
    return (
      <React.Fragment>
        <h1>Waitlist System</h1>
        <DisplayFreeSlots waitinglist={this.state.waitinglist}/>
        <h2>Waiting List</h2>
        <CustomersTable waitinglist={this.state.waitinglist} />
        <hr/>
        <h2>Add new Customer</h2>
        <AddCustomer pushCustomer={this.pushCustomer} />
        <hr/>
        <h2>Delete seated Customer</h2>
        <DeleteCustomer deleteCustomer={this.deleteCustomer} />
      </React.Fragment>
    );
  }
}


const element = <WaitList />;

ReactDOM.render(element, document.getElementById('contents'));