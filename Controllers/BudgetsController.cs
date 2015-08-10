using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Budgets.Controllers
{
    public class Transaction
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Category { get; set; }
    }


    public class BudgetsController : Controller
    {
        static List<Transaction> Transactions = new List<Transaction>()
            {
                new Transaction() { Amount = -25.99m, Category = "Bills", Name = "Rent" },
                new Transaction() { Amount = 100.00m, Category = "Savings", Name = "Car" }
            };

        // GET: api/values
        [HttpGet, Route("budgets/{name}")]
        public object Get(string name)
        {
            return new
            {
                transactions = Transactions
                    .Where(o => o.Amount >= 0)
                    .Concat(
                        Transactions.Where(o => o.Amount < 0)),
                left = Transactions.Sum(o => o.Amount)
            };
        }

        [HttpPost, Route("budgets/{name}")]
        public void Post(string name, [FromBody]Transaction transaction)
        {
            Transactions.Add(transaction);
        }
    }
}
