export type OfficeLocation = {
  name: string;
  address: string;
  phone: string;
  maps: string;
};

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    name: "Centennial Hills",
    address: "9406 Del Webb Boulevard, Las Vegas, NV 89134",
    phone: "(702) 718-0043",
    maps: "https://www.google.com/maps/search/?api=1&query=9406+Del+Webb+Boulevard,+Las+Vegas,+NV+89134",
  },
  {
    name: "Henderson",
    address: "3185 St Rose Pkwy, Suite 101, Henderson, NV 89052",
    phone: "(702) 500-1955",
    maps: "https://www.google.com/maps/search/?api=1&query=3185+St+Rose+Pkwy,+Suite+101,+Henderson,+NV+89052",
  },
  {
    name: "Sunset",
    address: "8850 W Sunset Rd UNIT 200, Las Vegas, NV 89148",
    phone: "(702) 500-1942",
    maps: "https://www.google.com/maps/search/?api=1&query=8850+W+Sunset+Rd+UNIT+200,+Las+Vegas,+NV+89148",
  },
  {
    name: "Summerlin",
    address: "1490 Center Crossing Rd, Las Vegas, NV 89144",
    phone: "(702) 903-1952",
    maps: "https://www.google.com/maps/search/?api=1&query=1490+Center+Crossing+Rd,+Las+Vegas,+NV+89144",
  },
  {
    name: "Sahara",
    address: "7475 W Sahara Ave #100, Las Vegas, NV 89117",
    phone: "(702) 299-6607",
    maps: "https://www.google.com/maps/search/?api=1&query=7475+W+Sahara+Ave+%23100,+Las+Vegas,+NV+89117",
  },
  {
    name: "Lone Mountain",
    address: "10777 W Twain Ave #333, Las Vegas, NV 89129",
    phone: "(702) 678-9012",
    maps: "https://www.google.com/maps/search/?api=1&query=10777+W+Twain+Ave+%23333,+Las+Vegas,+NV+89129",
  },
  {
    name: "North Las Vegas",
    address: "921 South Main Street, Las Vegas, NV 89101",
    phone: "(702) 500-1980",
    maps: "https://www.google.com/maps/search/?api=1&query=921+South+Main+Street,+Las+Vegas,+NV+89101",
  },
];
