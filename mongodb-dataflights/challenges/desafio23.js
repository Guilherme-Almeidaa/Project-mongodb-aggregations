db.voos.findOne({
  $and:
      [{ litrosCombustivel: { $not: { $gt: 1000 } } }, { litrosCombustivel: { $exists: true } },
      ] },
{ _id: false, vooId: true, litrosCombustivel: true });
