app.service("DataService", function() {
	var warranty_id;
	var warrantyDetails;
	var serviceCenters = [];
	
	var setServiceCenters = function(warranty_id, centers)
		{
			var item = {};
			item.warranty_id = warranty_id;
			item.serviceCenters = centers;
			serviceCenters.push(item);
		};
	var getServiceCenters = function(warranty_id)
		{
			result = [];
			indx = -1;
			$.each(serviceCenters, function(obj)
			{				
				if(warranty_id == warranty_id)
				{
					indx++;
					return;
				}
			});			
			if(indx >= 0)
				result =  serviceCenters[indx];
			else
				result = null;
			return result;
		};
	 var getWarranty = function()
		{
		  return warranty_id;
		};

	var setWarranty = function(id)
		{
			warranty_id = id;
		}
	
	var getWarrantyDetails = function()
	{
	  return warrantyDetails;
	};

	var setWarrantyDetails = function(item)
		{
		warrantyDetails = item;
		}

	return {
		getServiceCenters: getServiceCenters,
		setServiceCenters: setServiceCenters,
		getWarranty: getWarranty,
		setWarranty: setWarranty,
		getWarrantyDetails:getWarrantyDetails,
		setWarrantyDetails:setWarrantyDetails
	  };
});