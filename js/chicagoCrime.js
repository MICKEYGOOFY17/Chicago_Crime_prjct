module.exports = function convertcsv(startYear)
{
  if(typeof startYear !== 'number' || isNaN(startYear))
  {
        throw new Error('Not a number');
  }
const fs = require('fs');
let readfile = fs.createReadStream('crimedata.csv', 'utf-8');
let data = '';
readfile.on('data', function(chunk) {
	data = data + chunk;
});
readfile.on('end', function() {
	let StringData = data.toString();
	let dataString = StringData.split('\n');
	let sepTitle = dataString[0].split(',');
	let year = [];
	let PrimaryType = [];
	let description = [];
	let yearindex = sepTitle.indexOf('Year');
	let Pindex = sepTitle.indexOf('PrimaryType');
	let dindex = sepTitle.indexOf('Description');
	let part1 = [];
	let viewline = [];
	for(let i = 1; i < dataString.length; i = i + 1)
	{
		viewline = dataString[i].split(/,(?=(?:(?:[^']*'){2})*[^']*$)/);
		PrimaryType = viewline[Pindex];
		year = viewline[yearindex];
		description = viewline[dindex];
		if(PrimaryType === 'THEFT' && description === 'OVER $500' || description === '$500 AND UNDER') {
			if(year !== null && year > 2001) {
				let obj = {};
				obj['PrimaryType'] = PrimaryType;
				obj['Description'] = description;
				obj['Year'] = parseInt(year, 10);
				part1.push(obj);
		}
			}
		}
		fs.writeFile('part1.json', JSON.stringify(part1), 'utf-8');
	});
return 'JSON written successfully';
};
