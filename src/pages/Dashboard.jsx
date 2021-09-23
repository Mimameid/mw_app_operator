import React, { useEffect } from 'react';

import { Box, Grid, Paper, Toolbar, makeStyles } from '@material-ui/core';
import MyResponsiveLine from 'features/dashboard/components/MyResponsiveLine';
import MyResponsiveBar from 'features/dashboard/components/MyResponsiveBar';
import MyResponsivePie from 'features/dashboard/components/MyResponsivePie';
import MyResponsiveCalendar from 'features/dashboard/components/MyResponsiveCalendar';
import MyResponsiveAreaBump from 'features/dashboard/components/MyResponsiveAreaBump';
import ContentHeader from 'common/components/other/ContentHeader';

// import { useFetchUserData } from 'hooks/useFetchUserData';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  lineChartContainer: {},
}));

function Dashboard({ name }) {
  const classes = useStyles();

  useEffect(() => {
    // dispatch(fetchShopData());
  }, []);

  const data1 = [
    {
      id: 'japan',
      color: 'hsl(274, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 216,
        },
        {
          x: 'helicopter',
          y: 255,
        },
        {
          x: 'boat',
          y: 280,
        },
        {
          x: 'train',
          y: 50,
        },
        {
          x: 'subway',
          y: 95,
        },
        {
          x: 'bus',
          y: 259,
        },
        {
          x: 'car',
          y: 31,
        },
        {
          x: 'moto',
          y: 43,
        },
        {
          x: 'bicycle',
          y: 218,
        },
        {
          x: 'horse',
          y: 2,
        },
        {
          x: 'skateboard',
          y: 164,
        },
        {
          x: 'others',
          y: 126,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(296, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 143,
        },
        {
          x: 'helicopter',
          y: 262,
        },
        {
          x: 'boat',
          y: 87,
        },
        {
          x: 'train',
          y: 193,
        },
        {
          x: 'subway',
          y: 15,
        },
        {
          x: 'bus',
          y: 23,
        },
        {
          x: 'car',
          y: 111,
        },
        {
          x: 'moto',
          y: 118,
        },
        {
          x: 'bicycle',
          y: 289,
        },
        {
          x: 'horse',
          y: 281,
        },
        {
          x: 'skateboard',
          y: 180,
        },
        {
          x: 'others',
          y: 120,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(93, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 121,
        },
        {
          x: 'helicopter',
          y: 35,
        },
        {
          x: 'boat',
          y: 10,
        },
        {
          x: 'train',
          y: 239,
        },
        {
          x: 'subway',
          y: 57,
        },
        {
          x: 'bus',
          y: 60,
        },
        {
          x: 'car',
          y: 284,
        },
        {
          x: 'moto',
          y: 169,
        },
        {
          x: 'bicycle',
          y: 296,
        },
        {
          x: 'horse',
          y: 186,
        },
        {
          x: 'skateboard',
          y: 2,
        },
        {
          x: 'others',
          y: 38,
        },
      ],
    },
    {
      id: 'germany',
      color: 'hsl(137, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 92,
        },
        {
          x: 'helicopter',
          y: 93,
        },
        {
          x: 'boat',
          y: 200,
        },
        {
          x: 'train',
          y: 48,
        },
        {
          x: 'subway',
          y: 169,
        },
        {
          x: 'bus',
          y: 34,
        },
        {
          x: 'car',
          y: 236,
        },
        {
          x: 'moto',
          y: 73,
        },
        {
          x: 'bicycle',
          y: 23,
        },
        {
          x: 'horse',
          y: 257,
        },
        {
          x: 'skateboard',
          y: 69,
        },
        {
          x: 'others',
          y: 37,
        },
      ],
    },
    {
      id: 'norway',
      color: 'hsl(163, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 8,
        },
        {
          x: 'helicopter',
          y: 46,
        },
        {
          x: 'boat',
          y: 248,
        },
        {
          x: 'train',
          y: 300,
        },
        {
          x: 'subway',
          y: 171,
        },
        {
          x: 'bus',
          y: 295,
        },
        {
          x: 'car',
          y: 179,
        },
        {
          x: 'moto',
          y: 298,
        },
        {
          x: 'bicycle',
          y: 166,
        },
        {
          x: 'horse',
          y: 231,
        },
        {
          x: 'skateboard',
          y: 218,
        },
        {
          x: 'others',
          y: 172,
        },
      ],
    },
  ];
  const data2 = [
    {
      country: 'AD',
      'hot dog': 68,
      'hot dogColor': 'hsl(310, 70%, 50%)',
      burger: 199,
      burgerColor: 'hsl(92, 70%, 50%)',
      sandwich: 188,
      sandwichColor: 'hsl(353, 70%, 50%)',
      kebab: 28,
      kebabColor: 'hsl(156, 70%, 50%)',
      fries: 183,
      friesColor: 'hsl(309, 70%, 50%)',
      donut: 169,
      donutColor: 'hsl(143, 70%, 50%)',
    },
    {
      country: 'AE',
      'hot dog': 61,
      'hot dogColor': 'hsl(34, 70%, 50%)',
      burger: 157,
      burgerColor: 'hsl(158, 70%, 50%)',
      sandwich: 63,
      sandwichColor: 'hsl(288, 70%, 50%)',
      kebab: 131,
      kebabColor: 'hsl(308, 70%, 50%)',
      fries: 184,
      friesColor: 'hsl(326, 70%, 50%)',
      donut: 173,
      donutColor: 'hsl(143, 70%, 50%)',
    },
    {
      country: 'AF',
      'hot dog': 100,
      'hot dogColor': 'hsl(304, 70%, 50%)',
      burger: 109,
      burgerColor: 'hsl(199, 70%, 50%)',
      sandwich: 51,
      sandwichColor: 'hsl(22, 70%, 50%)',
      kebab: 42,
      kebabColor: 'hsl(179, 70%, 50%)',
      fries: 194,
      friesColor: 'hsl(13, 70%, 50%)',
      donut: 152,
      donutColor: 'hsl(351, 70%, 50%)',
    },
    {
      country: 'AG',
      'hot dog': 27,
      'hot dogColor': 'hsl(73, 70%, 50%)',
      burger: 183,
      burgerColor: 'hsl(23, 70%, 50%)',
      sandwich: 200,
      sandwichColor: 'hsl(180, 70%, 50%)',
      kebab: 79,
      kebabColor: 'hsl(93, 70%, 50%)',
      fries: 179,
      friesColor: 'hsl(216, 70%, 50%)',
      donut: 22,
      donutColor: 'hsl(281, 70%, 50%)',
    },
    {
      country: 'AI',
      'hot dog': 22,
      'hot dogColor': 'hsl(357, 70%, 50%)',
      burger: 58,
      burgerColor: 'hsl(94, 70%, 50%)',
      sandwich: 175,
      sandwichColor: 'hsl(294, 70%, 50%)',
      kebab: 28,
      kebabColor: 'hsl(144, 70%, 50%)',
      fries: 199,
      friesColor: 'hsl(221, 70%, 50%)',
      donut: 200,
      donutColor: 'hsl(42, 70%, 50%)',
    },
    {
      country: 'AL',
      'hot dog': 129,
      'hot dogColor': 'hsl(92, 70%, 50%)',
      burger: 22,
      burgerColor: 'hsl(168, 70%, 50%)',
      sandwich: 13,
      sandwichColor: 'hsl(316, 70%, 50%)',
      kebab: 46,
      kebabColor: 'hsl(111, 70%, 50%)',
      fries: 93,
      friesColor: 'hsl(234, 70%, 50%)',
      donut: 7,
      donutColor: 'hsl(275, 70%, 50%)',
    },
    {
      country: 'AM',
      'hot dog': 148,
      'hot dogColor': 'hsl(65, 70%, 50%)',
      burger: 118,
      burgerColor: 'hsl(135, 70%, 50%)',
      sandwich: 158,
      sandwichColor: 'hsl(171, 70%, 50%)',
      kebab: 23,
      kebabColor: 'hsl(4, 70%, 50%)',
      fries: 168,
      friesColor: 'hsl(312, 70%, 50%)',
      donut: 200,
      donutColor: 'hsl(279, 70%, 50%)',
    },
  ];
  const data3 = [
    {
      value: 200,
      day: '2015-09-22',
    },
    {
      value: 57,
      day: '2015-12-14',
    },
    {
      value: 4,
      day: '2016-12-23',
    },
    {
      value: 130,
      day: '2017-07-14',
    },
    {
      value: 209,
      day: '2017-07-17',
    },
    {
      value: 12,
      day: '2018-04-25',
    },
    {
      value: 102,
      day: '2016-05-19',
    },
    {
      value: 254,
      day: '2017-01-17',
    },
    {
      value: 109,
      day: '2017-07-19',
    },
    {
      value: 322,
      day: '2016-03-25',
    },
    {
      value: 31,
      day: '2015-11-24',
    },
    {
      value: 131,
      day: '2016-07-24',
    },
    {
      value: 57,
      day: '2015-05-27',
    },
    {
      value: 314,
      day: '2016-02-06',
    },
    {
      value: 231,
      day: '2016-04-29',
    },
    {
      value: 309,
      day: '2015-12-22',
    },
    {
      value: 66,
      day: '2017-06-25',
    },
    {
      value: 29,
      day: '2017-12-08',
    },
    {
      value: 348,
      day: '2017-06-03',
    },
    {
      value: 316,
      day: '2018-06-10',
    },
    {
      value: 137,
      day: '2017-03-03',
    },
    {
      value: 144,
      day: '2015-11-29',
    },
    {
      value: 119,
      day: '2017-06-18',
    },
    {
      value: 195,
      day: '2017-07-18',
    },
    {
      value: 382,
      day: '2016-12-22',
    },
    {
      value: 28,
      day: '2017-04-01',
    },
    {
      value: 60,
      day: '2016-05-17',
    },
    {
      value: 359,
      day: '2015-04-27',
    },
    {
      value: 355,
      day: '2017-06-10',
    },
    {
      value: 32,
      day: '2015-09-04',
    },
    {
      value: 223,
      day: '2016-07-30',
    },
    {
      value: 128,
      day: '2017-11-11',
    },
    {
      value: 166,
      day: '2018-01-01',
    },
    {
      value: 302,
      day: '2015-06-23',
    },
    {
      value: 24,
      day: '2016-08-23',
    },
    {
      value: 224,
      day: '2017-11-27',
    },
    {
      value: 287,
      day: '2016-06-07',
    },
    {
      value: 30,
      day: '2015-04-12',
    },
    {
      value: 37,
      day: '2017-11-06',
    },
    {
      value: 346,
      day: '2018-02-12',
    },
    {
      value: 134,
      day: '2015-12-20',
    },
    {
      value: 377,
      day: '2016-08-14',
    },
    {
      value: 285,
      day: '2015-08-17',
    },
    {
      value: 287,
      day: '2016-11-05',
    },
    {
      value: 111,
      day: '2015-08-14',
    },
    {
      value: 254,
      day: '2018-06-05',
    },
    {
      value: 292,
      day: '2017-01-03',
    },
    {
      value: 325,
      day: '2016-02-14',
    },
    {
      value: 107,
      day: '2015-08-30',
    },
    {
      value: 25,
      day: '2018-06-18',
    },
    {
      value: 285,
      day: '2017-03-19',
    },
    {
      value: 201,
      day: '2017-09-08',
    },
    {
      value: 125,
      day: '2016-05-11',
    },
    {
      value: 304,
      day: '2018-08-06',
    },
    {
      value: 102,
      day: '2018-05-30',
    },
    {
      value: 194,
      day: '2016-03-23',
    },
    {
      value: 266,
      day: '2015-04-08',
    },
    {
      value: 257,
      day: '2018-03-26',
    },
    {
      value: 361,
      day: '2016-11-26',
    },
    {
      value: 293,
      day: '2015-08-04',
    },
    {
      value: 69,
      day: '2018-02-02',
    },
    {
      value: 313,
      day: '2016-09-01',
    },
    {
      value: 232,
      day: '2017-02-23',
    },
    {
      value: 373,
      day: '2018-02-25',
    },
    {
      value: 158,
      day: '2015-04-29',
    },
    {
      value: 14,
      day: '2018-04-01',
    },
    {
      value: 375,
      day: '2017-06-04',
    },
    {
      value: 218,
      day: '2015-05-18',
    },
    {
      value: 312,
      day: '2017-02-15',
    },
    {
      value: 238,
      day: '2017-09-20',
    },
    {
      value: 268,
      day: '2017-09-03',
    },
    {
      value: 277,
      day: '2015-06-19',
    },
    {
      value: 302,
      day: '2017-11-22',
    },
    {
      value: 177,
      day: '2015-04-15',
    },
    {
      value: 44,
      day: '2017-04-15',
    },
    {
      value: 286,
      day: '2017-01-11',
    },
    {
      value: 327,
      day: '2015-04-03',
    },
    {
      value: 133,
      day: '2016-12-27',
    },
    {
      value: 296,
      day: '2016-01-01',
    },
    {
      value: 182,
      day: '2015-12-04',
    },
    {
      value: 308,
      day: '2016-07-26',
    },
    {
      value: 127,
      day: '2017-11-15',
    },
    {
      value: 295,
      day: '2015-09-06',
    },
    {
      value: 340,
      day: '2016-11-06',
    },
    {
      value: 290,
      day: '2018-05-09',
    },
    {
      value: 364,
      day: '2017-10-21',
    },
    {
      value: 107,
      day: '2017-06-28',
    },
    {
      value: 84,
      day: '2016-02-02',
    },
    {
      value: 139,
      day: '2018-05-01',
    },
    {
      value: 240,
      day: '2017-02-28',
    },
    {
      value: 70,
      day: '2016-03-02',
    },
    {
      value: 4,
      day: '2016-05-01',
    },
    {
      value: 187,
      day: '2017-12-26',
    },
    {
      value: 204,
      day: '2016-02-28',
    },
    {
      value: 162,
      day: '2015-04-09',
    },
    {
      value: 369,
      day: '2017-04-30',
    },
    {
      value: 192,
      day: '2017-11-26',
    },
    {
      value: 87,
      day: '2016-05-28',
    },
    {
      value: 196,
      day: '2016-04-23',
    },
    {
      value: 391,
      day: '2015-07-20',
    },
    {
      value: 373,
      day: '2016-02-17',
    },
    {
      value: 251,
      day: '2016-06-26',
    },
    {
      value: 245,
      day: '2016-11-29',
    },
    {
      value: 272,
      day: '2018-06-02',
    },
    {
      value: 73,
      day: '2018-07-28',
    },
    {
      value: 127,
      day: '2016-05-12',
    },
    {
      value: 329,
      day: '2017-02-17',
    },
    {
      value: 339,
      day: '2016-07-12',
    },
    {
      value: 103,
      day: '2015-05-04',
    },
    {
      value: 62,
      day: '2015-07-06',
    },
    {
      value: 205,
      day: '2017-07-15',
    },
    {
      value: 50,
      day: '2017-07-01',
    },
    {
      value: 351,
      day: '2017-01-07',
    },
    {
      value: 309,
      day: '2017-01-29',
    },
    {
      value: 366,
      day: '2017-01-18',
    },
    {
      value: 172,
      day: '2015-12-12',
    },
    {
      value: 324,
      day: '2016-02-08',
    },
    {
      value: 259,
      day: '2017-09-24',
    },
    {
      value: 136,
      day: '2016-11-03',
    },
    {
      value: 213,
      day: '2015-09-12',
    },
    {
      value: 246,
      day: '2015-04-24',
    },
    {
      value: 386,
      day: '2017-06-15',
    },
    {
      value: 189,
      day: '2016-09-02',
    },
    {
      value: 391,
      day: '2015-05-02',
    },
    {
      value: 220,
      day: '2015-07-04',
    },
    {
      value: 50,
      day: '2017-03-10',
    },
    {
      value: 129,
      day: '2016-11-15',
    },
    {
      value: 123,
      day: '2016-09-13',
    },
    {
      value: 366,
      day: '2016-10-07',
    },
    {
      value: 28,
      day: '2015-11-25',
    },
    {
      value: 114,
      day: '2017-08-05',
    },
    {
      value: 224,
      day: '2016-01-28',
    },
    {
      value: 174,
      day: '2016-09-21',
    },
    {
      value: 140,
      day: '2016-10-31',
    },
    {
      value: 197,
      day: '2017-08-01',
    },
    {
      value: 399,
      day: '2018-06-14',
    },
    {
      value: 132,
      day: '2016-12-19',
    },
    {
      value: 231,
      day: '2016-01-05',
    },
    {
      value: 151,
      day: '2017-06-16',
    },
    {
      value: 397,
      day: '2018-04-16',
    },
    {
      value: 121,
      day: '2015-12-19',
    },
    {
      value: 293,
      day: '2017-02-18',
    },
    {
      value: 343,
      day: '2016-08-03',
    },
    {
      value: 315,
      day: '2016-11-12',
    },
    {
      value: 85,
      day: '2016-10-15',
    },
    {
      value: 133,
      day: '2016-03-13',
    },
    {
      value: 314,
      day: '2017-08-21',
    },
    {
      value: 229,
      day: '2015-06-10',
    },
    {
      value: 7,
      day: '2017-06-20',
    },
    {
      value: 333,
      day: '2017-10-08',
    },
    {
      value: 45,
      day: '2017-05-10',
    },
    {
      value: 389,
      day: '2015-11-17',
    },
    {
      value: 325,
      day: '2015-11-20',
    },
    {
      value: 197,
      day: '2018-05-11',
    },
    {
      value: 270,
      day: '2017-01-15',
    },
    {
      value: 387,
      day: '2017-06-23',
    },
    {
      value: 385,
      day: '2018-01-29',
    },
    {
      value: 269,
      day: '2017-04-28',
    },
    {
      value: 11,
      day: '2015-12-06',
    },
    {
      value: 158,
      day: '2016-01-30',
    },
    {
      value: 111,
      day: '2017-06-11',
    },
    {
      value: 283,
      day: '2015-07-07',
    },
    {
      value: 322,
      day: '2017-01-25',
    },
    {
      value: 159,
      day: '2016-11-07',
    },
    {
      value: 180,
      day: '2015-09-18',
    },
    {
      value: 74,
      day: '2015-09-09',
    },
    {
      value: 231,
      day: '2016-10-17',
    },
    {
      value: 228,
      day: '2017-11-13',
    },
    {
      value: 393,
      day: '2016-09-10',
    },
    {
      value: 319,
      day: '2016-07-13',
    },
    {
      value: 203,
      day: '2018-04-11',
    },
    {
      value: 64,
      day: '2018-04-21',
    },
    {
      value: 272,
      day: '2016-03-24',
    },
    {
      value: 196,
      day: '2016-06-17',
    },
    {
      value: 138,
      day: '2018-06-22',
    },
    {
      value: 204,
      day: '2017-08-13',
    },
    {
      value: 206,
      day: '2018-03-23',
    },
    {
      value: 142,
      day: '2017-09-04',
    },
    {
      value: 312,
      day: '2015-11-03',
    },
    {
      value: 373,
      day: '2018-02-28',
    },
    {
      value: 135,
      day: '2016-10-01',
    },
    {
      value: 313,
      day: '2016-06-14',
    },
    {
      value: 128,
      day: '2016-09-15',
    },
    {
      value: 123,
      day: '2015-10-19',
    },
    {
      value: 146,
      day: '2017-11-14',
    },
    {
      value: 122,
      day: '2018-06-13',
    },
    {
      value: 125,
      day: '2016-12-25',
    },
    {
      value: 391,
      day: '2017-01-12',
    },
    {
      value: 120,
      day: '2017-10-01',
    },
    {
      value: 23,
      day: '2018-01-15',
    },
    {
      value: 356,
      day: '2016-08-18',
    },
    {
      value: 349,
      day: '2016-04-15',
    },
    {
      value: 76,
      day: '2015-06-04',
    },
    {
      value: 310,
      day: '2016-11-01',
    },
    {
      value: 227,
      day: '2017-12-07',
    },
    {
      value: 94,
      day: '2016-07-15',
    },
    {
      value: 138,
      day: '2016-12-28',
    },
    {
      value: 386,
      day: '2018-04-06',
    },
    {
      value: 177,
      day: '2015-05-11',
    },
    {
      value: 176,
      day: '2017-04-16',
    },
    {
      value: 311,
      day: '2016-06-19',
    },
    {
      value: 378,
      day: '2016-10-12',
    },
    {
      value: 302,
      day: '2018-04-24',
    },
    {
      value: 158,
      day: '2015-08-26',
    },
    {
      value: 139,
      day: '2018-07-11',
    },
    {
      value: 234,
      day: '2017-08-31',
    },
    {
      value: 237,
      day: '2015-09-11',
    },
    {
      value: 21,
      day: '2015-11-07',
    },
    {
      value: 69,
      day: '2018-07-16',
    },
    {
      value: 224,
      day: '2016-12-06',
    },
    {
      value: 43,
      day: '2017-03-28',
    },
    {
      value: 46,
      day: '2018-04-19',
    },
    {
      value: 81,
      day: '2016-08-26',
    },
    {
      value: 132,
      day: '2017-06-19',
    },
    {
      value: 19,
      day: '2016-05-24',
    },
    {
      value: 0,
      day: '2016-02-20',
    },
    {
      value: 395,
      day: '2016-04-28',
    },
    {
      value: 373,
      day: '2015-11-13',
    },
    {
      value: 179,
      day: '2018-05-12',
    },
    {
      value: 283,
      day: '2016-01-14',
    },
    {
      value: 251,
      day: '2015-08-08',
    },
    {
      value: 395,
      day: '2017-05-03',
    },
    {
      value: 37,
      day: '2016-03-29',
    },
    {
      value: 2,
      day: '2017-06-26',
    },
    {
      value: 44,
      day: '2017-12-30',
    },
    {
      value: 257,
      day: '2018-03-13',
    },
    {
      value: 109,
      day: '2017-08-29',
    },
    {
      value: 387,
      day: '2016-11-04',
    },
    {
      value: 308,
      day: '2017-10-28',
    },
    {
      value: 117,
      day: '2015-09-15',
    },
    {
      value: 212,
      day: '2016-08-01',
    },
    {
      value: 385,
      day: '2015-08-10',
    },
    {
      value: 260,
      day: '2016-08-20',
    },
    {
      value: 321,
      day: '2018-07-05',
    },
    {
      value: 205,
      day: '2015-04-17',
    },
    {
      value: 188,
      day: '2018-07-18',
    },
    {
      value: 206,
      day: '2016-04-06',
    },
    {
      value: 238,
      day: '2015-07-08',
    },
    {
      value: 284,
      day: '2015-10-05',
    },
    {
      value: 10,
      day: '2015-11-18',
    },
    {
      value: 130,
      day: '2016-12-11',
    },
    {
      value: 318,
      day: '2018-07-22',
    },
    {
      value: 314,
      day: '2015-05-21',
    },
    {
      value: 127,
      day: '2018-02-11',
    },
    {
      value: 281,
      day: '2018-07-08',
    },
    {
      value: 180,
      day: '2016-10-28',
    },
    {
      value: 59,
      day: '2018-04-28',
    },
    {
      value: 302,
      day: '2018-01-24',
    },
    {
      value: 320,
      day: '2015-09-25',
    },
    {
      value: 196,
      day: '2015-06-06',
    },
    {
      value: 169,
      day: '2016-02-10',
    },
    {
      value: 176,
      day: '2017-04-03',
    },
    {
      value: 300,
      day: '2016-08-15',
    },
    {
      value: 4,
      day: '2017-10-17',
    },
    {
      value: 310,
      day: '2015-10-30',
    },
    {
      value: 43,
      day: '2016-12-24',
    },
    {
      value: 268,
      day: '2017-09-30',
    },
    {
      value: 395,
      day: '2018-06-20',
    },
    {
      value: 274,
      day: '2015-09-02',
    },
    {
      value: 33,
      day: '2017-05-21',
    },
    {
      value: 383,
      day: '2016-05-09',
    },
    {
      value: 53,
      day: '2017-05-11',
    },
    {
      value: 329,
      day: '2015-07-15',
    },
    {
      value: 155,
      day: '2016-08-25',
    },
    {
      value: 182,
      day: '2018-02-08',
    },
    {
      value: 169,
      day: '2016-02-16',
    },
    {
      value: 215,
      day: '2017-12-23',
    },
    {
      value: 366,
      day: '2015-06-20',
    },
    {
      value: 285,
      day: '2017-07-28',
    },
    {
      value: 195,
      day: '2016-04-19',
    },
    {
      value: 388,
      day: '2016-08-04',
    },
    {
      value: 362,
      day: '2018-03-20',
    },
    {
      value: 378,
      day: '2016-11-23',
    },
    {
      value: 15,
      day: '2016-07-06',
    },
    {
      value: 115,
      day: '2017-08-11',
    },
    {
      value: 237,
      day: '2016-10-05',
    },
    {
      value: 195,
      day: '2015-05-29',
    },
    {
      value: 204,
      day: '2018-02-04',
    },
    {
      value: 12,
      day: '2017-01-19',
    },
    {
      value: 244,
      day: '2016-06-16',
    },
    {
      value: 242,
      day: '2016-01-12',
    },
    {
      value: 22,
      day: '2018-07-06',
    },
    {
      value: 260,
      day: '2016-11-19',
    },
    {
      value: 269,
      day: '2015-06-21',
    },
    {
      value: 2,
      day: '2018-07-20',
    },
    {
      value: 168,
      day: '2017-11-20',
    },
    {
      value: 339,
      day: '2015-06-01',
    },
    {
      value: 32,
      day: '2015-10-09',
    },
    {
      value: 228,
      day: '2018-06-01',
    },
    {
      value: 390,
      day: '2016-03-15',
    },
    {
      value: 270,
      day: '2018-03-16',
    },
    {
      value: 168,
      day: '2016-07-01',
    },
    {
      value: 144,
      day: '2015-05-25',
    },
    {
      value: 362,
      day: '2017-07-11',
    },
    {
      value: 120,
      day: '2018-08-09',
    },
    {
      value: 233,
      day: '2017-08-28',
    },
    {
      value: 106,
      day: '2016-09-05',
    },
    {
      value: 306,
      day: '2018-04-15',
    },
    {
      value: 306,
      day: '2015-12-17',
    },
    {
      value: 345,
      day: '2016-03-22',
    },
    {
      value: 122,
      day: '2018-02-05',
    },
    {
      value: 395,
      day: '2018-07-19',
    },
    {
      value: 43,
      day: '2016-11-02',
    },
    {
      value: 91,
      day: '2018-05-29',
    },
    {
      value: 7,
      day: '2016-02-18',
    },
    {
      value: 369,
      day: '2016-12-03',
    },
    {
      value: 359,
      day: '2016-02-27',
    },
    {
      value: 306,
      day: '2017-01-24',
    },
    {
      value: 23,
      day: '2016-07-02',
    },
    {
      value: 44,
      day: '2016-10-25',
    },
    {
      value: 54,
      day: '2015-08-01',
    },
    {
      value: 311,
      day: '2016-03-14',
    },
    {
      value: 102,
      day: '2015-06-22',
    },
    {
      value: 346,
      day: '2018-02-19',
    },
    {
      value: 348,
      day: '2016-04-18',
    },
    {
      value: 82,
      day: '2015-10-14',
    },
    {
      value: 169,
      day: '2017-12-25',
    },
    {
      value: 57,
      day: '2015-07-09',
    },
    {
      value: 29,
      day: '2018-02-26',
    },
    {
      value: 387,
      day: '2018-01-03',
    },
    {
      value: 338,
      day: '2016-01-23',
    },
    {
      value: 125,
      day: '2017-03-14',
    },
    {
      value: 144,
      day: '2017-12-21',
    },
    {
      value: 248,
      day: '2015-04-14',
    },
    {
      value: 69,
      day: '2017-08-19',
    },
    {
      value: 341,
      day: '2016-01-24',
    },
    {
      value: 311,
      day: '2018-03-30',
    },
    {
      value: 323,
      day: '2016-07-03',
    },
    {
      value: 51,
      day: '2016-06-21',
    },
    {
      value: 21,
      day: '2018-02-06',
    },
    {
      value: 213,
      day: '2017-06-05',
    },
    {
      value: 359,
      day: '2018-03-04',
    },
    {
      value: 38,
      day: '2017-03-06',
    },
    {
      value: 346,
      day: '2017-02-05',
    },
    {
      value: 311,
      day: '2016-02-13',
    },
    {
      value: 193,
      day: '2015-10-01',
    },
    {
      value: 237,
      day: '2015-09-26',
    },
    {
      value: 113,
      day: '2016-12-18',
    },
    {
      value: 138,
      day: '2016-04-30',
    },
    {
      value: 76,
      day: '2016-08-22',
    },
    {
      value: 220,
      day: '2016-10-02',
    },
    {
      value: 10,
      day: '2016-07-20',
    },
    {
      value: 194,
      day: '2018-03-01',
    },
    {
      value: 12,
      day: '2017-08-23',
    },
    {
      value: 316,
      day: '2016-11-20',
    },
    {
      value: 129,
      day: '2017-10-16',
    },
    {
      value: 310,
      day: '2015-10-28',
    },
    {
      value: 380,
      day: '2017-09-02',
    },
    {
      value: 237,
      day: '2017-08-15',
    },
    {
      value: 246,
      day: '2017-09-25',
    },
    {
      value: 51,
      day: '2018-03-10',
    },
    {
      value: 61,
      day: '2015-07-12',
    },
    {
      value: 285,
      day: '2016-06-30',
    },
    {
      value: 61,
      day: '2016-08-13',
    },
    {
      value: 173,
      day: '2015-08-09',
    },
    {
      value: 322,
      day: '2017-10-06',
    },
    {
      value: 18,
      day: '2015-10-12',
    },
    {
      value: 321,
      day: '2015-10-16',
    },
    {
      value: 142,
      day: '2016-07-17',
    },
    {
      value: 89,
      day: '2016-05-31',
    },
    {
      value: 377,
      day: '2015-07-16',
    },
    {
      value: 59,
      day: '2018-03-02',
    },
    {
      value: 240,
      day: '2016-07-10',
    },
    {
      value: 110,
      day: '2016-03-18',
    },
    {
      value: 29,
      day: '2018-06-12',
    },
    {
      value: 152,
      day: '2018-06-16',
    },
    {
      value: 69,
      day: '2016-02-23',
    },
    {
      value: 142,
      day: '2015-05-20',
    },
    {
      value: 250,
      day: '2016-12-10',
    },
    {
      value: 230,
      day: '2016-11-25',
    },
    {
      value: 251,
      day: '2016-04-11',
    },
    {
      value: 27,
      day: '2018-08-05',
    },
    {
      value: 385,
      day: '2015-05-05',
    },
    {
      value: 1,
      day: '2015-07-21',
    },
    {
      value: 200,
      day: '2017-12-29',
    },
    {
      value: 101,
      day: '2017-05-01',
    },
    {
      value: 280,
      day: '2016-12-14',
    },
    {
      value: 246,
      day: '2015-06-12',
    },
    {
      value: 39,
      day: '2015-07-26',
    },
    {
      value: 128,
      day: '2016-12-07',
    },
    {
      value: 72,
      day: '2017-08-22',
    },
    {
      value: 369,
      day: '2016-08-05',
    },
    {
      value: 34,
      day: '2015-07-11',
    },
    {
      value: 292,
      day: '2016-05-18',
    },
    {
      value: 32,
      day: '2018-04-10',
    },
    {
      value: 249,
      day: '2018-03-24',
    },
    {
      value: 255,
      day: '2015-05-16',
    },
    {
      value: 202,
      day: '2017-04-23',
    },
    {
      value: 255,
      day: '2018-07-24',
    },
    {
      value: 14,
      day: '2015-05-01',
    },
    {
      value: 342,
      day: '2017-10-11',
    },
    {
      value: 236,
      day: '2016-03-04',
    },
    {
      value: 183,
      day: '2017-08-30',
    },
    {
      value: 163,
      day: '2017-03-11',
    },
    {
      value: 343,
      day: '2018-07-25',
    },
    {
      value: 206,
      day: '2016-08-17',
    },
    {
      value: 267,
      day: '2016-06-22',
    },
    {
      value: 353,
      day: '2018-06-23',
    },
    {
      value: 123,
      day: '2018-01-17',
    },
    {
      value: 87,
      day: '2017-09-10',
    },
    {
      value: 38,
      day: '2017-10-02',
    },
    {
      value: 343,
      day: '2018-07-29',
    },
    {
      value: 212,
      day: '2016-10-18',
    },
    {
      value: 122,
      day: '2018-01-27',
    },
    {
      value: 255,
      day: '2015-05-24',
    },
    {
      value: 216,
      day: '2018-07-07',
    },
    {
      value: 85,
      day: '2017-01-06',
    },
    {
      value: 139,
      day: '2016-11-27',
    },
    {
      value: 327,
      day: '2017-05-25',
    },
    {
      value: 3,
      day: '2017-08-08',
    },
    {
      value: 235,
      day: '2016-03-12',
    },
    {
      value: 119,
      day: '2015-08-22',
    },
    {
      value: 133,
      day: '2017-12-06',
    },
    {
      value: 293,
      day: '2015-10-31',
    },
    {
      value: 177,
      day: '2018-01-28',
    },
    {
      value: 120,
      day: '2017-11-01',
    },
    {
      value: 105,
      day: '2016-02-22',
    },
    {
      value: 367,
      day: '2018-01-30',
    },
    {
      value: 142,
      day: '2016-10-16',
    },
    {
      value: 331,
      day: '2016-06-13',
    },
    {
      value: 91,
      day: '2017-06-14',
    },
    {
      value: 378,
      day: '2017-02-20',
    },
    {
      value: 363,
      day: '2017-10-03',
    },
    {
      value: 75,
      day: '2017-07-05',
    },
    {
      value: 367,
      day: '2016-03-20',
    },
    {
      value: 49,
      day: '2017-03-02',
    },
    {
      value: 376,
      day: '2015-08-25',
    },
    {
      value: 112,
      day: '2018-08-08',
    },
    {
      value: 335,
      day: '2016-03-07',
    },
    {
      value: 358,
      day: '2017-01-01',
    },
    {
      value: 368,
      day: '2018-03-11',
    },
    {
      value: 255,
      day: '2018-01-18',
    },
    {
      value: 332,
      day: '2017-05-16',
    },
    {
      value: 45,
      day: '2015-07-17',
    },
    {
      value: 97,
      day: '2017-04-04',
    },
    {
      value: 234,
      day: '2016-01-26',
    },
    {
      value: 392,
      day: '2016-01-29',
    },
    {
      value: 192,
      day: '2017-05-08',
    },
    {
      value: 376,
      day: '2016-12-17',
    },
    {
      value: 59,
      day: '2017-04-11',
    },
    {
      value: 190,
      day: '2017-03-27',
    },
    {
      value: 16,
      day: '2016-12-13',
    },
    {
      value: 247,
      day: '2016-12-09',
    },
    {
      value: 40,
      day: '2017-09-16',
    },
    {
      value: 66,
      day: '2017-10-10',
    },
    {
      value: 237,
      day: '2018-03-14',
    },
    {
      value: 244,
      day: '2016-07-25',
    },
    {
      value: 158,
      day: '2015-09-14',
    },
    {
      value: 125,
      day: '2017-05-04',
    },
    {
      value: 364,
      day: '2016-08-16',
    },
    {
      value: 326,
      day: '2016-10-23',
    },
    {
      value: 254,
      day: '2018-07-21',
    },
    {
      value: 186,
      day: '2016-09-28',
    },
    {
      value: 138,
      day: '2015-09-10',
    },
    {
      value: 286,
      day: '2015-04-30',
    },
    {
      value: 362,
      day: '2016-03-01',
    },
    {
      value: 141,
      day: '2017-06-30',
    },
    {
      value: 79,
      day: '2017-11-17',
    },
    {
      value: 202,
      day: '2015-07-19',
    },
    {
      value: 103,
      day: '2016-07-16',
    },
    {
      value: 186,
      day: '2015-10-04',
    },
    {
      value: 362,
      day: '2015-04-02',
    },
    {
      value: 143,
      day: '2017-05-05',
    },
    {
      value: 218,
      day: '2016-04-01',
    },
    {
      value: 327,
      day: '2015-04-26',
    },
    {
      value: 293,
      day: '2017-02-01',
    },
    {
      value: 303,
      day: '2018-06-11',
    },
    {
      value: 32,
      day: '2016-09-25',
    },
    {
      value: 395,
      day: '2018-02-20',
    },
    {
      value: 151,
      day: '2018-03-31',
    },
    {
      value: 359,
      day: '2015-05-13',
    },
    {
      value: 66,
      day: '2018-04-17',
    },
    {
      value: 15,
      day: '2017-05-12',
    },
    {
      value: 380,
      day: '2017-10-20',
    },
    {
      value: 280,
      day: '2017-06-21',
    },
    {
      value: 24,
      day: '2016-08-09',
    },
    {
      value: 171,
      day: '2017-06-12',
    },
    {
      value: 233,
      day: '2018-03-28',
    },
    {
      value: 8,
      day: '2016-04-24',
    },
    {
      value: 367,
      day: '2018-08-04',
    },
    {
      value: 189,
      day: '2015-08-07',
    },
    {
      value: 279,
      day: '2017-06-17',
    },
    {
      value: 138,
      day: '2015-11-27',
    },
    {
      value: 249,
      day: '2016-12-15',
    },
    {
      value: 164,
      day: '2017-05-28',
    },
    {
      value: 271,
      day: '2016-10-08',
    },
    {
      value: 140,
      day: '2017-11-23',
    },
    {
      value: 224,
      day: '2015-12-27',
    },
    {
      value: 176,
      day: '2016-02-07',
    },
    {
      value: 50,
      day: '2015-10-06',
    },
    {
      value: 267,
      day: '2015-12-23',
    },
    {
      value: 324,
      day: '2016-05-25',
    },
    {
      value: 132,
      day: '2017-02-03',
    },
    {
      value: 91,
      day: '2015-12-05',
    },
    {
      value: 290,
      day: '2018-08-01',
    },
    {
      value: 310,
      day: '2015-11-06',
    },
    {
      value: 375,
      day: '2018-07-14',
    },
    {
      value: 363,
      day: '2017-11-04',
    },
    {
      value: 58,
      day: '2016-02-04',
    },
    {
      value: 350,
      day: '2018-05-10',
    },
    {
      value: 222,
      day: '2015-11-30',
    },
    {
      value: 32,
      day: '2015-08-27',
    },
    {
      value: 102,
      day: '2018-04-02',
    },
    {
      value: 354,
      day: '2017-12-12',
    },
    {
      value: 205,
      day: '2016-11-24',
    },
    {
      value: 307,
      day: '2017-04-25',
    },
    {
      value: 380,
      day: '2018-01-10',
    },
    {
      value: 148,
      day: '2017-12-28',
    },
    {
      value: 378,
      day: '2016-02-29',
    },
    {
      value: 285,
      day: '2018-05-27',
    },
    {
      value: 383,
      day: '2017-05-14',
    },
    {
      value: 351,
      day: '2018-03-08',
    },
    {
      value: 265,
      day: '2018-07-04',
    },
    {
      value: 383,
      day: '2015-04-05',
    },
    {
      value: 207,
      day: '2016-05-15',
    },
    {
      value: 12,
      day: '2016-10-30',
    },
    {
      value: 348,
      day: '2015-08-03',
    },
    {
      value: 279,
      day: '2017-07-03',
    },
    {
      value: 3,
      day: '2016-06-20',
    },
    {
      value: 49,
      day: '2017-12-22',
    },
    {
      value: 341,
      day: '2018-05-08',
    },
    {
      value: 16,
      day: '2017-12-24',
    },
    {
      value: 307,
      day: '2015-08-21',
    },
    {
      value: 364,
      day: '2017-02-21',
    },
    {
      value: 275,
      day: '2018-02-09',
    },
    {
      value: 344,
      day: '2017-03-18',
    },
    {
      value: 22,
      day: '2017-06-27',
    },
    {
      value: 330,
      day: '2016-03-26',
    },
    {
      value: 100,
      day: '2016-04-08',
    },
    {
      value: 14,
      day: '2016-12-31',
    },
    {
      value: 9,
      day: '2017-03-08',
    },
    {
      value: 15,
      day: '2017-12-19',
    },
    {
      value: 396,
      day: '2016-07-11',
    },
    {
      value: 150,
      day: '2017-02-08',
    },
    {
      value: 59,
      day: '2015-07-01',
    },
    {
      value: 345,
      day: '2017-11-07',
    },
    {
      value: 108,
      day: '2015-10-10',
    },
    {
      value: 283,
      day: '2015-06-27',
    },
    {
      value: 8,
      day: '2015-06-25',
    },
    {
      value: 227,
      day: '2017-12-31',
    },
    {
      value: 324,
      day: '2018-06-07',
    },
    {
      value: 124,
      day: '2017-12-05',
    },
    {
      value: 143,
      day: '2016-03-19',
    },
    {
      value: 85,
      day: '2016-02-21',
    },
    {
      value: 376,
      day: '2015-12-01',
    },
    {
      value: 115,
      day: '2018-07-31',
    },
    {
      value: 319,
      day: '2017-10-27',
    },
    {
      value: 161,
      day: '2016-06-12',
    },
    {
      value: 383,
      day: '2017-07-02',
    },
    {
      value: 371,
      day: '2018-07-12',
    },
    {
      value: 197,
      day: '2017-05-29',
    },
    {
      value: 52,
      day: '2017-06-07',
    },
    {
      value: 60,
      day: '2015-08-28',
    },
    {
      value: 224,
      day: '2015-10-13',
    },
    {
      value: 6,
      day: '2017-08-16',
    },
    {
      value: 319,
      day: '2015-10-25',
    },
    {
      value: 322,
      day: '2016-09-07',
    },
    {
      value: 379,
      day: '2016-03-17',
    },
    {
      value: 59,
      day: '2017-04-19',
    },
    {
      value: 362,
      day: '2017-09-14',
    },
    {
      value: 340,
      day: '2015-09-01',
    },
    {
      value: 293,
      day: '2017-04-09',
    },
    {
      value: 312,
      day: '2016-03-08',
    },
    {
      value: 77,
      day: '2016-10-13',
    },
    {
      value: 6,
      day: '2016-10-09',
    },
    {
      value: 326,
      day: '2018-04-30',
    },
    {
      value: 283,
      day: '2017-03-23',
    },
    {
      value: 274,
      day: '2015-05-10',
    },
    {
      value: 348,
      day: '2017-09-06',
    },
    {
      value: 393,
      day: '2016-01-03',
    },
    {
      value: 81,
      day: '2015-12-13',
    },
    {
      value: 241,
      day: '2018-04-18',
    },
    {
      value: 123,
      day: '2018-06-30',
    },
    {
      value: 36,
      day: '2016-04-09',
    },
    {
      value: 178,
      day: '2017-03-20',
    },
    {
      value: 237,
      day: '2015-05-14',
    },
    {
      value: 276,
      day: '2017-08-25',
    },
    {
      value: 213,
      day: '2018-01-21',
    },
    {
      value: 392,
      day: '2015-04-16',
    },
    {
      value: 291,
      day: '2016-05-21',
    },
    {
      value: 87,
      day: '2017-04-18',
    },
    {
      value: 74,
      day: '2015-11-12',
    },
    {
      value: 176,
      day: '2016-04-26',
    },
    {
      value: 161,
      day: '2017-02-16',
    },
    {
      value: 2,
      day: '2017-04-20',
    },
    {
      value: 390,
      day: '2018-01-07',
    },
    {
      value: 288,
      day: '2017-10-29',
    },
    {
      value: 358,
      day: '2015-12-02',
    },
    {
      value: 317,
      day: '2017-02-06',
    },
    {
      value: 151,
      day: '2018-03-21',
    },
    {
      value: 53,
      day: '2018-01-31',
    },
    {
      value: 58,
      day: '2015-06-15',
    },
    {
      value: 63,
      day: '2017-03-30',
    },
    {
      value: 111,
      day: '2015-11-23',
    },
    {
      value: 74,
      day: '2016-01-09',
    },
    {
      value: 157,
      day: '2015-11-15',
    },
    {
      value: 320,
      day: '2017-07-26',
    },
    {
      value: 177,
      day: '2016-02-24',
    },
    {
      value: 112,
      day: '2017-04-08',
    },
    {
      value: 281,
      day: '2018-02-01',
    },
    {
      value: 215,
      day: '2018-04-23',
    },
    {
      value: 180,
      day: '2016-08-12',
    },
    {
      value: 119,
      day: '2015-04-23',
    },
    {
      value: 150,
      day: '2016-12-20',
    },
    {
      value: 389,
      day: '2017-04-29',
    },
    {
      value: 214,
      day: '2016-03-10',
    },
    {
      value: 95,
      day: '2017-12-11',
    },
    {
      value: 130,
      day: '2017-10-04',
    },
    {
      value: 130,
      day: '2017-11-16',
    },
    {
      value: 355,
      day: '2017-04-13',
    },
    {
      value: 43,
      day: '2017-07-22',
    },
    {
      value: 143,
      day: '2016-11-10',
    },
    {
      value: 243,
      day: '2015-11-26',
    },
    {
      value: 399,
      day: '2015-07-18',
    },
    {
      value: 36,
      day: '2018-03-19',
    },
    {
      value: 378,
      day: '2017-12-16',
    },
    {
      value: 391,
      day: '2016-01-08',
    },
    {
      value: 253,
      day: '2017-03-26',
    },
    {
      value: 166,
      day: '2017-09-12',
    },
    {
      value: 243,
      day: '2017-02-27',
    },
    {
      value: 54,
      day: '2018-07-01',
    },
    {
      value: 148,
      day: '2017-05-09',
    },
    {
      value: 164,
      day: '2016-09-06',
    },
    {
      value: 253,
      day: '2015-08-02',
    },
    {
      value: 179,
      day: '2016-06-29',
    },
    {
      value: 294,
      day: '2016-07-19',
    },
    {
      value: 336,
      day: '2018-05-17',
    },
    {
      value: 114,
      day: '2015-08-05',
    },
    {
      value: 12,
      day: '2017-12-13',
    },
    {
      value: 292,
      day: '2018-04-27',
    },
    {
      value: 90,
      day: '2018-03-03',
    },
    {
      value: 356,
      day: '2016-05-26',
    },
    {
      value: 392,
      day: '2015-04-20',
    },
    {
      value: 114,
      day: '2017-01-09',
    },
    {
      value: 391,
      day: '2018-03-07',
    },
    {
      value: 186,
      day: '2018-06-21',
    },
    {
      value: 207,
      day: '2015-12-10',
    },
    {
      value: 169,
      day: '2016-07-29',
    },
    {
      value: 300,
      day: '2015-04-01',
    },
    {
      value: 254,
      day: '2016-04-20',
    },
    {
      value: 275,
      day: '2016-02-26',
    },
    {
      value: 283,
      day: '2016-06-25',
    },
    {
      value: 373,
      day: '2018-05-14',
    },
    {
      value: 146,
      day: '2018-01-14',
    },
    {
      value: 20,
      day: '2016-08-19',
    },
    {
      value: 244,
      day: '2018-01-12',
    },
    {
      value: 322,
      day: '2016-11-18',
    },
    {
      value: 191,
      day: '2016-04-05',
    },
    {
      value: 183,
      day: '2017-10-12',
    },
    {
      value: 151,
      day: '2016-02-25',
    },
    {
      value: 137,
      day: '2017-03-09',
    },
    {
      value: 109,
      day: '2015-10-02',
    },
    {
      value: 134,
      day: '2017-08-03',
    },
    {
      value: 335,
      day: '2016-06-01',
    },
    {
      value: 168,
      day: '2016-08-31',
    },
    {
      value: 350,
      day: '2018-02-03',
    },
    {
      value: 210,
      day: '2015-06-03',
    },
    {
      value: 331,
      day: '2017-08-27',
    },
    {
      value: 96,
      day: '2015-09-24',
    },
    {
      value: 58,
      day: '2017-06-29',
    },
    {
      value: 139,
      day: '2018-06-03',
    },
    {
      value: 48,
      day: '2015-11-21',
    },
    {
      value: 337,
      day: '2016-06-27',
    },
    {
      value: 239,
      day: '2018-04-07',
    },
    {
      value: 26,
      day: '2017-01-20',
    },
    {
      value: 316,
      day: '2016-09-12',
    },
    {
      value: 331,
      day: '2015-09-13',
    },
    {
      value: 7,
      day: '2018-05-20',
    },
    {
      value: 273,
      day: '2018-07-10',
    },
    {
      value: 159,
      day: '2018-06-09',
    },
    {
      value: 394,
      day: '2017-07-30',
    },
    {
      value: 212,
      day: '2017-02-26',
    },
    {
      value: 223,
      day: '2018-06-15',
    },
    {
      value: 95,
      day: '2015-12-08',
    },
    {
      value: 249,
      day: '2016-09-18',
    },
    {
      value: 362,
      day: '2017-08-20',
    },
    {
      value: 120,
      day: '2015-07-10',
    },
    {
      value: 303,
      day: '2017-12-14',
    },
    {
      value: 93,
      day: '2016-02-01',
    },
    {
      value: 254,
      day: '2018-03-18',
    },
    {
      value: 21,
      day: '2017-07-31',
    },
    {
      value: 176,
      day: '2018-07-03',
    },
    {
      value: 328,
      day: '2015-10-07',
    },
    {
      value: 251,
      day: '2015-06-28',
    },
    {
      value: 246,
      day: '2016-05-06',
    },
    {
      value: 117,
      day: '2018-06-17',
    },
    {
      value: 379,
      day: '2016-09-19',
    },
    {
      value: 55,
      day: '2017-01-22',
    },
    {
      value: 194,
      day: '2015-07-27',
    },
    {
      value: 258,
      day: '2017-05-15',
    },
    {
      value: 333,
      day: '2015-05-26',
    },
    {
      value: 217,
      day: '2017-07-13',
    },
    {
      value: 176,
      day: '2017-09-01',
    },
    {
      value: 304,
      day: '2017-10-26',
    },
    {
      value: 276,
      day: '2016-03-09',
    },
    {
      value: 195,
      day: '2015-05-08',
    },
    {
      value: 290,
      day: '2017-08-02',
    },
    {
      value: 196,
      day: '2018-05-21',
    },
    {
      value: 389,
      day: '2016-06-06',
    },
    {
      value: 356,
      day: '2016-09-11',
    },
    {
      value: 219,
      day: '2017-12-10',
    },
    {
      value: 278,
      day: '2018-04-22',
    },
    {
      value: 203,
      day: '2016-03-11',
    },
    {
      value: 28,
      day: '2017-11-12',
    },
    {
      value: 277,
      day: '2016-01-06',
    },
    {
      value: 280,
      day: '2016-08-07',
    },
    {
      value: 298,
      day: '2016-10-22',
    },
    {
      value: 18,
      day: '2016-11-08',
    },
    {
      value: 208,
      day: '2018-03-05',
    },
    {
      value: 376,
      day: '2016-03-05',
    },
    {
      value: 383,
      day: '2018-03-22',
    },
    {
      value: 17,
      day: '2018-08-07',
    },
    {
      value: 45,
      day: '2017-01-10',
    },
    {
      value: 390,
      day: '2017-03-17',
    },
    {
      value: 330,
      day: '2018-04-03',
    },
    {
      value: 314,
      day: '2016-01-31',
    },
    {
      value: 95,
      day: '2016-05-04',
    },
    {
      value: 338,
      day: '2017-10-19',
    },
    {
      value: 274,
      day: '2016-09-09',
    },
    {
      value: 113,
      day: '2018-05-13',
    },
    {
      value: 104,
      day: '2018-03-25',
    },
    {
      value: 118,
      day: '2015-05-31',
    },
    {
      value: 314,
      day: '2015-11-08',
    },
    {
      value: 212,
      day: '2016-12-30',
    },
    {
      value: 375,
      day: '2016-07-23',
    },
    {
      value: 306,
      day: '2017-06-09',
    },
    {
      value: 190,
      day: '2016-07-31',
    },
    {
      value: 352,
      day: '2015-08-23',
    },
    {
      value: 275,
      day: '2016-05-07',
    },
    {
      value: 208,
      day: '2016-06-24',
    },
    {
      value: 37,
      day: '2015-06-17',
    },
    {
      value: 330,
      day: '2018-07-17',
    },
    {
      value: 217,
      day: '2016-11-22',
    },
    {
      value: 178,
      day: '2016-09-26',
    },
    {
      value: 97,
      day: '2017-09-15',
    },
    {
      value: 171,
      day: '2015-08-24',
    },
    {
      value: 356,
      day: '2015-07-14',
    },
    {
      value: 37,
      day: '2018-01-05',
    },
    {
      value: 264,
      day: '2017-10-18',
    },
    {
      value: 171,
      day: '2018-02-10',
    },
    {
      value: 112,
      day: '2016-03-06',
    },
    {
      value: 368,
      day: '2016-04-10',
    },
    {
      value: 300,
      day: '2017-12-18',
    },
    {
      value: 217,
      day: '2015-07-25',
    },
    {
      value: 351,
      day: '2017-10-25',
    },
    {
      value: 126,
      day: '2018-07-13',
    },
    {
      value: 296,
      day: '2015-09-30',
    },
    {
      value: 136,
      day: '2017-10-09',
    },
    {
      value: 204,
      day: '2016-12-01',
    },
    {
      value: 121,
      day: '2016-08-06',
    },
    {
      value: 109,
      day: '2017-11-02',
    },
    {
      value: 169,
      day: '2018-04-14',
    },
    {
      value: 217,
      day: '2017-09-09',
    },
    {
      value: 354,
      day: '2016-04-02',
    },
    {
      value: 169,
      day: '2016-12-12',
    },
    {
      value: 324,
      day: '2017-11-24',
    },
    {
      value: 159,
      day: '2017-02-13',
    },
    {
      value: 181,
      day: '2015-06-26',
    },
    {
      value: 195,
      day: '2015-05-19',
    },
    {
      value: 340,
      day: '2017-03-22',
    },
    {
      value: 215,
      day: '2017-10-31',
    },
    {
      value: 301,
      day: '2017-02-14',
    },
    {
      value: 101,
      day: '2017-01-31',
    },
    {
      value: 369,
      day: '2015-05-28',
    },
    {
      value: 385,
      day: '2016-11-13',
    },
    {
      value: 13,
      day: '2015-10-26',
    },
    {
      value: 216,
      day: '2015-07-03',
    },
    {
      value: 29,
      day: '2016-11-30',
    },
    {
      value: 222,
      day: '2018-02-16',
    },
    {
      value: 123,
      day: '2016-09-30',
    },
    {
      value: 38,
      day: '2017-11-29',
    },
    {
      value: 176,
      day: '2018-01-02',
    },
    {
      value: 215,
      day: '2016-01-02',
    },
    {
      value: 158,
      day: '2016-10-26',
    },
    {
      value: 45,
      day: '2016-06-15',
    },
    {
      value: 225,
      day: '2016-05-03',
    },
    {
      value: 345,
      day: '2016-01-21',
    },
    {
      value: 134,
      day: '2016-10-03',
    },
    {
      value: 171,
      day: '2015-06-07',
    },
    {
      value: 136,
      day: '2015-12-31',
    },
    {
      value: 154,
      day: '2017-04-21',
    },
    {
      value: 302,
      day: '2017-07-12',
    },
    {
      value: 259,
      day: '2018-04-26',
    },
    {
      value: 140,
      day: '2018-06-24',
    },
    {
      value: 197,
      day: '2016-10-06',
    },
    {
      value: 383,
      day: '2016-07-18',
    },
    {
      value: 223,
      day: '2015-11-04',
    },
    {
      value: 398,
      day: '2015-11-09',
    },
    {
      value: 24,
      day: '2015-08-13',
    },
    {
      value: 36,
      day: '2015-06-24',
    },
    {
      value: 154,
      day: '2016-04-13',
    },
    {
      value: 261,
      day: '2018-05-22',
    },
    {
      value: 87,
      day: '2015-07-28',
    },
    {
      value: 178,
      day: '2016-06-11',
    },
    {
      value: 345,
      day: '2017-12-04',
    },
    {
      value: 27,
      day: '2017-03-15',
    },
    {
      value: 106,
      day: '2015-10-11',
    },
    {
      value: 117,
      day: '2018-01-04',
    },
    {
      value: 31,
      day: '2015-10-20',
    },
    {
      value: 384,
      day: '2015-11-05',
    },
    {
      value: 183,
      day: '2017-02-04',
    },
    {
      value: 11,
      day: '2017-07-08',
    },
    {
      value: 281,
      day: '2015-08-06',
    },
    {
      value: 47,
      day: '2017-09-19',
    },
    {
      value: 38,
      day: '2018-01-06',
    },
    {
      value: 303,
      day: '2017-10-24',
    },
    {
      value: 291,
      day: '2016-01-18',
    },
    {
      value: 248,
      day: '2017-12-20',
    },
    {
      value: 314,
      day: '2016-05-30',
    },
    {
      value: 224,
      day: '2018-08-03',
    },
    {
      value: 63,
      day: '2016-10-20',
    },
    {
      value: 215,
      day: '2017-05-30',
    },
    {
      value: 161,
      day: '2016-01-16',
    },
    {
      value: 155,
      day: '2016-05-14',
    },
    {
      value: 262,
      day: '2016-01-10',
    },
    {
      value: 368,
      day: '2015-07-02',
    },
    {
      value: 251,
      day: '2018-01-08',
    },
    {
      value: 106,
      day: '2015-06-09',
    },
    {
      value: 30,
      day: '2017-11-10',
    },
    {
      value: 179,
      day: '2017-03-21',
    },
    {
      value: 50,
      day: '2016-06-04',
    },
    {
      value: 386,
      day: '2016-07-09',
    },
    {
      value: 137,
      day: '2015-10-29',
    },
    {
      value: 150,
      day: '2017-07-23',
    },
    {
      value: 117,
      day: '2015-09-20',
    },
    {
      value: 232,
      day: '2018-04-04',
    },
    {
      value: 90,
      day: '2018-01-13',
    },
    {
      value: 237,
      day: '2017-06-01',
    },
    {
      value: 127,
      day: '2018-04-08',
    },
    {
      value: 213,
      day: '2015-04-28',
    },
    {
      value: 115,
      day: '2017-08-24',
    },
    {
      value: 314,
      day: '2016-12-08',
    },
    {
      value: 230,
      day: '2016-12-16',
    },
    {
      value: 284,
      day: '2017-05-20',
    },
    {
      value: 39,
      day: '2016-12-29',
    },
    {
      value: 47,
      day: '2016-01-11',
    },
    {
      value: 25,
      day: '2018-05-02',
    },
    {
      value: 239,
      day: '2018-08-11',
    },
    {
      value: 39,
      day: '2016-06-09',
    },
    {
      value: 305,
      day: '2018-07-09',
    },
    {
      value: 78,
      day: '2016-03-31',
    },
    {
      value: 121,
      day: '2017-12-03',
    },
    {
      value: 22,
      day: '2016-06-03',
    },
    {
      value: 5,
      day: '2016-01-07',
    },
    {
      value: 66,
      day: '2015-12-11',
    },
    {
      value: 345,
      day: '2018-05-28',
    },
    {
      value: 313,
      day: '2016-12-04',
    },
    {
      value: 56,
      day: '2016-08-10',
    },
    {
      value: 176,
      day: '2015-05-17',
    },
    {
      value: 341,
      day: '2016-10-11',
    },
    {
      value: 273,
      day: '2016-06-05',
    },
    {
      value: 264,
      day: '2017-05-26',
    },
    {
      value: 278,
      day: '2016-03-30',
    },
    {
      value: 188,
      day: '2017-02-02',
    },
    {
      value: 4,
      day: '2017-03-12',
    },
    {
      value: 205,
      day: '2017-12-01',
    },
    {
      value: 164,
      day: '2017-07-07',
    },
    {
      value: 230,
      day: '2017-04-02',
    },
    {
      value: 228,
      day: '2015-12-25',
    },
    {
      value: 365,
      day: '2015-10-15',
    },
    {
      value: 278,
      day: '2017-11-18',
    },
    {
      value: 375,
      day: '2018-05-26',
    },
    {
      value: 369,
      day: '2015-07-22',
    },
    {
      value: 252,
      day: '2017-04-17',
    },
    {
      value: 226,
      day: '2017-03-01',
    },
    {
      value: 284,
      day: '2015-11-14',
    },
    {
      value: 331,
      day: '2016-08-02',
    },
    {
      value: 16,
      day: '2017-04-26',
    },
    {
      value: 42,
      day: '2016-10-27',
    },
    {
      value: 180,
      day: '2018-04-12',
    },
    {
      value: 83,
      day: '2015-07-29',
    },
    {
      value: 128,
      day: '2017-06-22',
    },
    {
      value: 159,
      day: '2018-02-21',
    },
    {
      value: 66,
      day: '2016-08-24',
    },
    {
      value: 6,
      day: '2015-05-09',
    },
    {
      value: 190,
      day: '2016-10-10',
    },
    {
      value: 395,
      day: '2016-07-22',
    },
    {
      value: 92,
      day: '2016-04-22',
    },
    {
      value: 270,
      day: '2016-06-02',
    },
    {
      value: 376,
      day: '2017-05-27',
    },
    {
      value: 114,
      day: '2018-01-16',
    },
    {
      value: 31,
      day: '2017-02-19',
    },
    {
      value: 16,
      day: '2016-12-21',
    },
    {
      value: 262,
      day: '2018-01-22',
    },
    {
      value: 219,
      day: '2015-05-12',
    },
    {
      value: 380,
      day: '2015-10-22',
    },
    {
      value: 118,
      day: '2015-12-28',
    },
    {
      value: 112,
      day: '2015-08-15',
    },
    {
      value: 382,
      day: '2016-11-09',
    },
    {
      value: 383,
      day: '2016-08-21',
    },
    {
      value: 343,
      day: '2016-11-17',
    },
    {
      value: 327,
      day: '2018-03-06',
    },
    {
      value: 46,
      day: '2015-08-11',
    },
    {
      value: 332,
      day: '2017-10-23',
    },
    {
      value: 55,
      day: '2017-05-24',
    },
    {
      value: 59,
      day: '2018-06-27',
    },
    {
      value: 158,
      day: '2018-05-18',
    },
    {
      value: 138,
      day: '2017-12-15',
    },
    {
      value: 222,
      day: '2017-10-05',
    },
    {
      value: 128,
      day: '2015-10-21',
    },
    {
      value: 288,
      day: '2017-07-29',
    },
    {
      value: 370,
      day: '2015-04-11',
    },
    {
      value: 239,
      day: '2017-11-28',
    },
    {
      value: 310,
      day: '2015-10-17',
    },
    {
      value: 310,
      day: '2015-11-10',
    },
    {
      value: 107,
      day: '2017-11-05',
    },
    {
      value: 77,
      day: '2016-05-20',
    },
    {
      value: 115,
      day: '2016-01-19',
    },
    {
      value: 398,
      day: '2015-04-13',
    },
    {
      value: 104,
      day: '2015-08-12',
    },
    {
      value: 370,
      day: '2018-01-26',
    },
    {
      value: 58,
      day: '2015-04-25',
    },
    {
      value: 208,
      day: '2018-03-17',
    },
    {
      value: 336,
      day: '2016-05-02',
    },
    {
      value: 100,
      day: '2018-05-06',
    },
    {
      value: 115,
      day: '2017-11-03',
    },
    {
      value: 163,
      day: '2015-07-05',
    },
    {
      value: 104,
      day: '2017-10-14',
    },
    {
      value: 8,
      day: '2018-08-10',
    },
    {
      value: 308,
      day: '2016-10-04',
    },
    {
      value: 278,
      day: '2015-06-13',
    },
    {
      value: 286,
      day: '2015-04-21',
    },
    {
      value: 85,
      day: '2016-01-20',
    },
    {
      value: 165,
      day: '2018-02-17',
    },
    {
      value: 14,
      day: '2015-12-09',
    },
    {
      value: 214,
      day: '2017-07-20',
    },
    {
      value: 171,
      day: '2017-11-21',
    },
    {
      value: 377,
      day: '2016-09-17',
    },
    {
      value: 347,
      day: '2017-07-09',
    },
    {
      value: 241,
      day: '2017-03-25',
    },
    {
      value: 119,
      day: '2016-11-16',
    },
    {
      value: 325,
      day: '2016-11-21',
    },
    {
      value: 256,
      day: '2018-05-05',
    },
    {
      value: 325,
      day: '2015-06-30',
    },
    {
      value: 378,
      day: '2017-04-07',
    },
    {
      value: 281,
      day: '2018-02-22',
    },
    {
      value: 313,
      day: '2018-05-04',
    },
    {
      value: 322,
      day: '2017-03-07',
    },
    {
      value: 212,
      day: '2017-02-10',
    },
    {
      value: 21,
      day: '2016-09-23',
    },
    {
      value: 399,
      day: '2017-01-13',
    },
    {
      value: 23,
      day: '2016-03-27',
    },
    {
      value: 80,
      day: '2017-09-17',
    },
    {
      value: 361,
      day: '2018-05-24',
    },
    {
      value: 210,
      day: '2017-11-08',
    },
    {
      value: 303,
      day: '2016-06-08',
    },
    {
      value: 300,
      day: '2016-02-11',
    },
    {
      value: 249,
      day: '2015-12-21',
    },
    {
      value: 392,
      day: '2018-02-13',
    },
    {
      value: 393,
      day: '2017-12-17',
    },
    {
      value: 64,
      day: '2017-09-26',
    },
    {
      value: 285,
      day: '2015-06-11',
    },
    {
      value: 164,
      day: '2016-03-21',
    },
    {
      value: 121,
      day: '2015-09-05',
    },
    {
      value: 57,
      day: '2017-01-28',
    },
    {
      value: 308,
      day: '2016-06-18',
    },
    {
      value: 221,
      day: '2016-07-05',
    },
    {
      value: 184,
      day: '2016-07-27',
    },
    {
      value: 42,
      day: '2018-06-19',
    },
    {
      value: 301,
      day: '2017-09-11',
    },
    {
      value: 241,
      day: '2015-09-16',
    },
    {
      value: 310,
      day: '2017-01-30',
    },
    {
      value: 305,
      day: '2017-12-27',
    },
    {
      value: 123,
      day: '2018-05-25',
    },
    {
      value: 388,
      day: '2018-05-23',
    },
    {
      value: 374,
      day: '2017-04-12',
    },
    {
      value: 243,
      day: '2016-01-25',
    },
    {
      value: 330,
      day: '2015-10-18',
    },
    {
      value: 347,
      day: '2015-12-26',
    },
    {
      value: 33,
      day: '2017-03-24',
    },
    {
      value: 209,
      day: '2017-08-12',
    },
    {
      value: 13,
      day: '2016-10-21',
    },
    {
      value: 389,
      day: '2017-08-14',
    },
    {
      value: 155,
      day: '2017-04-22',
    },
    {
      value: 249,
      day: '2015-11-01',
    },
    {
      value: 35,
      day: '2017-04-14',
    },
    {
      value: 172,
      day: '2017-11-19',
    },
    {
      value: 278,
      day: '2015-08-19',
    },
    {
      value: 106,
      day: '2016-06-23',
    },
  ];
  const data4 = [
    {
      id: 'lisp',
      label: 'lisp',
      value: 514,
      color: 'hsl(291, 70%, 50%)',
    },
    {
      id: 'erlang',
      label: 'erlang',
      value: 69,
      color: 'hsl(49, 70%, 50%)',
    },
    {
      id: 'python',
      label: 'python',
      value: 422,
      color: 'hsl(168, 70%, 50%)',
    },
    {
      id: 'go',
      label: 'go',
      value: 421,
      color: 'hsl(222, 70%, 50%)',
    },
    {
      id: 'php',
      label: 'php',
      value: 381,
      color: 'hsl(186, 70%, 50%)',
    },
  ];
  const data5 = [
    {
      id: 'JavaScript',
      data: [
        {
          x: 2000,
          y: 16,
        },
        {
          x: 2001,
          y: 22,
        },
        {
          x: 2002,
          y: 22,
        },
        {
          x: 2003,
          y: 16,
        },
        {
          x: 2004,
          y: 24,
        },
        {
          x: 2005,
          y: 17,
        },
      ],
    },
    {
      id: 'ReasonML',
      data: [
        {
          x: 2000,
          y: 27,
        },
        {
          x: 2001,
          y: 11,
        },
        {
          x: 2002,
          y: 18,
        },
        {
          x: 2003,
          y: 20,
        },
        {
          x: 2004,
          y: 20,
        },
        {
          x: 2005,
          y: 28,
        },
      ],
    },
    {
      id: 'TypeScript',
      data: [
        {
          x: 2000,
          y: 26,
        },
        {
          x: 2001,
          y: 11,
        },
        {
          x: 2002,
          y: 26,
        },
        {
          x: 2003,
          y: 12,
        },
        {
          x: 2004,
          y: 22,
        },
        {
          x: 2005,
          y: 19,
        },
      ],
    },
    {
      id: 'Elm',
      data: [
        {
          x: 2000,
          y: 18,
        },
        {
          x: 2001,
          y: 27,
        },
        {
          x: 2002,
          y: 17,
        },
        {
          x: 2003,
          y: 15,
        },
        {
          x: 2004,
          y: 10,
        },
        {
          x: 2005,
          y: 16,
        },
      ],
    },
    {
      id: 'CoffeeScript',
      data: [
        {
          x: 2000,
          y: 26,
        },
        {
          x: 2001,
          y: 18,
        },
        {
          x: 2002,
          y: 19,
        },
        {
          x: 2003,
          y: 21,
        },
        {
          x: 2004,
          y: 11,
        },
        {
          x: 2005,
          y: 10,
        },
      ],
    },
  ];

  return (
    <Box className={classes.root} display="flex" flexDirection="column" flexGrow={1}>
      <Toolbar />
      <Box flexGrow={1}>
        <ContentHeader name={name} info="Visuelle Analyse Ihrer Daten." />
      </Box>
      <Grid component={Box} container flexGrow={1} spacing={3}>
        <Grid item xs={8}>
          <Paper style={{ padding: '12px', height: '500px', width: '100%' }}>
            <MyResponsiveLine data={data1} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ padding: '12px', height: '500px', width: '100%' }}>
            <MyResponsiveBar data={data2} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: '12px', height: '500px', width: '100%' }}>
            <MyResponsiveCalendar data={data3} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: '12px', height: '500px', width: '100%' }}>
            <MyResponsivePie data={data4} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: '12px', height: '500px', width: '100%' }}>
            <MyResponsiveAreaBump data={data5} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
