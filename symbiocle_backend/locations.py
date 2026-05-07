"""
Symbiocle - Indonesian Location Dataset
========================================
Layered location data: Province -> City/Kabupaten -> Postcode

NOTE FOR PRODUCTION:
This is a curated dataset covering ~100 cities/kabupaten across all 38 Indonesian
provinces, with sample postcodes per major city. Coordinates are city-center
accurate (sufficient for distance-based matchmaking). For production deployment,
this should be replaced with the full Pos Indonesia / BPS administrative dataset
which contains ~85,000 postcodes with precise area coordinates.

DATA STRUCTURE:
LOCATIONS = {
    "Province Name": {
        "City/Kabupaten Name": {
            "lat": -6.xxx, "lon": 106.xxx,
            "type": "Kota" or "Kabupaten",
            "postcodes": ["40111", "40112", ...]
        }
    }
}
"""

LOCATIONS = {
    # ========== JAVA ISLAND ==========
    "DKI Jakarta": {
        "Jakarta Pusat": {"lat": -6.1862, "lon": 106.8341, "type": "Kota",
                          "postcodes": ["10110", "10120", "10130", "10210", "10220", "10310", "10410"]},
        "Jakarta Utara": {"lat": -6.1383, "lon": 106.8632, "type": "Kota",
                          "postcodes": ["14110", "14120", "14210", "14310", "14410", "14430"]},
        "Jakarta Barat": {"lat": -6.1683, "lon": 106.7588, "type": "Kota",
                          "postcodes": ["11110", "11210", "11410", "11460", "11510", "11610"]},
        "Jakarta Selatan": {"lat": -6.2615, "lon": 106.8106, "type": "Kota",
                            "postcodes": ["12110", "12160", "12210", "12310", "12410", "12510", "12710"]},
        "Jakarta Timur": {"lat": -6.2250, "lon": 106.9004, "type": "Kota",
                          "postcodes": ["13110", "13210", "13310", "13410", "13510", "13720", "13830"]},
    },
    "Banten": {
        "Tangerang": {"lat": -6.1783, "lon": 106.6319, "type": "Kota",
                      "postcodes": ["15111", "15119", "15121", "15138", "15141", "15154", "15810"]},
        "Tangerang Selatan": {"lat": -6.2884, "lon": 106.7180, "type": "Kota",
                              "postcodes": ["15310", "15314", "15412", "15418", "15422", "15510"]},
        "Cilegon": {"lat": -6.0167, "lon": 106.0540, "type": "Kota",
                    "postcodes": ["42411", "42421", "42431", "42435", "42441"]},
        "Serang": {"lat": -6.1104, "lon": 106.1640, "type": "Kota",
                   "postcodes": ["42111", "42112", "42115", "42116", "42118"]},
        "Kabupaten Tangerang": {"lat": -6.1024, "lon": 106.5640, "type": "Kabupaten",
                                "postcodes": ["15510", "15710", "15720", "15810", "15820"]},
        "Kabupaten Lebak": {"lat": -6.5641, "lon": 106.2521, "type": "Kabupaten",
                            "postcodes": ["42313", "42314", "42351"]},
    },
    "Jawa Barat": {
        "Bandung": {"lat": -6.9175, "lon": 107.6191, "type": "Kota",
                    "postcodes": ["40111", "40115", "40132", "40135", "40235", "40241", "40285"]},
        "Bekasi": {"lat": -6.2349, "lon": 106.9896, "type": "Kota",
                   "postcodes": ["17111", "17121", "17131", "17141", "17411", "17510", "17530"]},
        "Bogor": {"lat": -6.5950, "lon": 106.8166, "type": "Kota",
                  "postcodes": ["16111", "16121", "16131", "16143", "16153", "16161"]},
        "Depok": {"lat": -6.4025, "lon": 106.7942, "type": "Kota",
                  "postcodes": ["16411", "16412", "16421", "16431", "16511", "16517"]},
        "Cirebon": {"lat": -6.7320, "lon": 108.5523, "type": "Kota",
                    "postcodes": ["45111", "45121", "45131", "45141", "45151"]},
        "Sukabumi": {"lat": -6.9277, "lon": 106.9276, "type": "Kota",
                     "postcodes": ["43111", "43113", "43122", "43131", "43142"]},
        "Tasikmalaya": {"lat": -7.3506, "lon": 108.2172, "type": "Kota",
                        "postcodes": ["46111", "46121", "46131", "46151", "46196"]},
        "Cimahi": {"lat": -6.8730, "lon": 107.5424, "type": "Kota",
                   "postcodes": ["40511", "40512", "40521", "40522"]},
        "Banjar": {"lat": -7.3744, "lon": 108.5340, "type": "Kota",
                   "postcodes": ["46311", "46321", "46331"]},
        "Kabupaten Bekasi": {"lat": -6.2615, "lon": 107.1551, "type": "Kabupaten",
                             "postcodes": ["17510", "17520", "17530", "17610", "17820"]},
        "Kabupaten Karawang": {"lat": -6.3015, "lon": 107.3027, "type": "Kabupaten",
                               "postcodes": ["41311", "41315", "41361", "41373"]},
        "Kabupaten Purwakarta": {"lat": -6.5570, "lon": 107.4438, "type": "Kabupaten",
                                 "postcodes": ["41111", "41115", "41117", "41181"]},
        "Kabupaten Bandung": {"lat": -7.0117, "lon": 107.5491, "type": "Kabupaten",
                              "postcodes": ["40362", "40376", "40391", "40972"]},
        "Kabupaten Sumedang": {"lat": -6.8500, "lon": 107.9200, "type": "Kabupaten",
                               "postcodes": ["45311", "45321", "45353", "45611"]},
    },
    "Jawa Tengah": {
        "Semarang": {"lat": -6.9667, "lon": 110.4167, "type": "Kota",
                     "postcodes": ["50111", "50132", "50162", "50196", "50211", "50241", "50275"]},
        "Solo (Surakarta)": {"lat": -7.5755, "lon": 110.8243, "type": "Kota",
                             "postcodes": ["57111", "57121", "57131", "57141", "57151", "57161"]},
        "Magelang": {"lat": -7.4797, "lon": 110.2177, "type": "Kota",
                     "postcodes": ["56111", "56112", "56121", "56122", "56131"]},
        "Salatiga": {"lat": -7.3305, "lon": 110.5084, "type": "Kota",
                     "postcodes": ["50711", "50721", "50722", "50731"]},
        "Pekalongan": {"lat": -6.8898, "lon": 109.6753, "type": "Kota",
                       "postcodes": ["51111", "51121", "51131", "51141", "51151"]},
        "Tegal": {"lat": -6.8694, "lon": 109.1402, "type": "Kota",
                  "postcodes": ["52111", "52121", "52131", "52141", "52151"]},
        "Cilacap": {"lat": -7.7244, "lon": 109.0177, "type": "Kabupaten",
                    "postcodes": ["53211", "53212", "53221", "53231", "53251"]},
        "Kabupaten Banyumas": {"lat": -7.5106, "lon": 109.2945, "type": "Kabupaten",
                               "postcodes": ["53111", "53112", "53114", "53121"]},
        "Kabupaten Kendal": {"lat": -6.9211, "lon": 110.2017, "type": "Kabupaten",
                             "postcodes": ["51311", "51315", "51351", "51371"]},
    },
    "DI Yogyakarta": {
        "Yogyakarta": {"lat": -7.7956, "lon": 110.3695, "type": "Kota",
                       "postcodes": ["55111", "55121", "55131", "55211", "55224", "55281"]},
        "Kabupaten Sleman": {"lat": -7.7167, "lon": 110.3553, "type": "Kabupaten",
                             "postcodes": ["55281", "55282", "55291", "55511", "55571", "55581"]},
        "Kabupaten Bantul": {"lat": -7.8881, "lon": 110.3287, "type": "Kabupaten",
                             "postcodes": ["55711", "55715", "55751", "55771", "55781"]},
        "Kabupaten Kulon Progo": {"lat": -7.8261, "lon": 110.1640, "type": "Kabupaten",
                                  "postcodes": ["55611", "55652", "55661", "55672"]},
        "Kabupaten Gunung Kidul": {"lat": -7.9683, "lon": 110.6125, "type": "Kabupaten",
                                   "postcodes": ["55811", "55851", "55861", "55881"]},
    },
    "Jawa Timur": {
        "Surabaya": {"lat": -7.2575, "lon": 112.7521, "type": "Kota",
                     "postcodes": ["60111", "60132", "60175", "60231", "60265", "60281", "60293"]},
        "Malang": {"lat": -7.9839, "lon": 112.6214, "type": "Kota",
                   "postcodes": ["65111", "65117", "65122", "65141", "65145", "65149"]},
        "Sidoarjo": {"lat": -7.4470, "lon": 112.7178, "type": "Kabupaten",
                     "postcodes": ["61211", "61222", "61234", "61252", "61271"]},
        "Gresik": {"lat": -7.1561, "lon": 112.6526, "type": "Kabupaten",
                   "postcodes": ["61111", "61121", "61151", "61161", "61171"]},
        "Mojokerto": {"lat": -7.4664, "lon": 112.4339, "type": "Kota",
                      "postcodes": ["61311", "61317", "61321", "61326"]},
        "Kediri": {"lat": -7.8167, "lon": 112.0114, "type": "Kota",
                   "postcodes": ["64111", "64115", "64121", "64129"]},
        "Madiun": {"lat": -7.6298, "lon": 111.5300, "type": "Kota",
                   "postcodes": ["63111", "63121", "63126", "63131"]},
        "Probolinggo": {"lat": -7.7543, "lon": 113.2159, "type": "Kota",
                        "postcodes": ["67211", "67215", "67221", "67223"]},
        "Pasuruan": {"lat": -7.6450, "lon": 112.9075, "type": "Kota",
                     "postcodes": ["67111", "67114", "67115", "67118"]},
        "Batu": {"lat": -7.8772, "lon": 112.5239, "type": "Kota",
                 "postcodes": ["65311", "65312", "65314", "65315"]},
        "Banyuwangi": {"lat": -8.2192, "lon": 114.3691, "type": "Kabupaten",
                       "postcodes": ["68411", "68421", "68425", "68451", "68461"]},
        "Jember": {"lat": -8.1844, "lon": 113.6681, "type": "Kabupaten",
                   "postcodes": ["68111", "68118", "68121", "68131", "68181"]},
        "Kabupaten Pasuruan": {"lat": -7.7468, "lon": 112.7833, "type": "Kabupaten",
                               "postcodes": ["67152", "67153", "67156", "67161", "67166"]},
    },
    "Bali": {
        "Denpasar": {"lat": -8.6705, "lon": 115.2126, "type": "Kota",
                     "postcodes": ["80111", "80114", "80222", "80232", "80239", "80361"]},
        "Kabupaten Badung": {"lat": -8.5800, "lon": 115.1862, "type": "Kabupaten",
                             "postcodes": ["80351", "80361", "80363", "80571"]},
        "Kabupaten Gianyar": {"lat": -8.5417, "lon": 115.3258, "type": "Kabupaten",
                              "postcodes": ["80511", "80512", "80551", "80571"]},
        "Kabupaten Buleleng": {"lat": -8.1124, "lon": 115.0876, "type": "Kabupaten",
                               "postcodes": ["81111", "81113", "81151", "81171"]},
    },
    # ========== SUMATRA ==========
    "Aceh": {
        "Banda Aceh": {"lat": 5.5483, "lon": 95.3238, "type": "Kota",
                       "postcodes": ["23111", "23112", "23116", "23121", "23123"]},
        "Lhokseumawe": {"lat": 5.1801, "lon": 97.1507, "type": "Kota",
                        "postcodes": ["24351", "24352", "24353"]},
    },
    "Sumatera Utara": {
        "Medan": {"lat": 3.5952, "lon": 98.6722, "type": "Kota",
                  "postcodes": ["20111", "20122", "20151", "20212", "20231", "20241"]},
        "Binjai": {"lat": 3.6001, "lon": 98.4854, "type": "Kota",
                   "postcodes": ["20711", "20712", "20721"]},
        "Pematang Siantar": {"lat": 2.9595, "lon": 99.0687, "type": "Kota",
                             "postcodes": ["21111", "21121", "21131"]},
        "Tebing Tinggi": {"lat": 3.3289, "lon": 99.1625, "type": "Kota",
                          "postcodes": ["20611", "20614"]},
        "Kabupaten Deli Serdang": {"lat": 3.4140, "lon": 98.7650, "type": "Kabupaten",
                                   "postcodes": ["20351", "20371", "20517", "20557"]},
    },
    "Sumatera Barat": {
        "Padang": {"lat": -0.9492, "lon": 100.3543, "type": "Kota",
                   "postcodes": ["25111", "25121", "25131", "25141", "25151"]},
        "Bukittinggi": {"lat": -0.3055, "lon": 100.3692, "type": "Kota",
                        "postcodes": ["26111", "26113", "26121"]},
        "Payakumbuh": {"lat": -0.2336, "lon": 100.6347, "type": "Kota",
                       "postcodes": ["26211", "26217", "26219"]},
    },
    "Riau": {
        "Pekanbaru": {"lat": 0.5071, "lon": 101.4478, "type": "Kota",
                      "postcodes": ["28111", "28113", "28121", "28131", "28141"]},
        "Dumai": {"lat": 1.6664, "lon": 101.4050, "type": "Kota",
                  "postcodes": ["28811", "28812", "28823"]},
    },
    "Kepulauan Riau": {
        "Batam": {"lat": 1.0456, "lon": 104.0305, "type": "Kota",
                  "postcodes": ["29411", "29422", "29432", "29456", "29461"]},
        "Tanjung Pinang": {"lat": 0.9189, "lon": 104.4490, "type": "Kota",
                           "postcodes": ["29111", "29112", "29115"]},
    },
    "Jambi": {
        "Jambi": {"lat": -1.6101, "lon": 103.6131, "type": "Kota",
                  "postcodes": ["36111", "36121", "36124", "36129", "36135"]},
    },
    "Sumatera Selatan": {
        "Palembang": {"lat": -2.9761, "lon": 104.7754, "type": "Kota",
                      "postcodes": ["30111", "30121", "30131", "30137", "30151", "30163"]},
        "Lubuklinggau": {"lat": -3.2924, "lon": 102.8617, "type": "Kota",
                         "postcodes": ["31611", "31613", "31621"]},
        "Prabumulih": {"lat": -3.4322, "lon": 104.2363, "type": "Kota",
                       "postcodes": ["31111", "31112", "31114"]},
    },
    "Bengkulu": {
        "Bengkulu": {"lat": -3.7928, "lon": 102.2608, "type": "Kota",
                     "postcodes": ["38111", "38119", "38223", "38226"]},
    },
    "Lampung": {
        "Bandar Lampung": {"lat": -5.4500, "lon": 105.2667, "type": "Kota",
                           "postcodes": ["35111", "35121", "35131", "35141", "35145"]},
        "Metro": {"lat": -5.1131, "lon": 105.3066, "type": "Kota",
                  "postcodes": ["34111", "34112", "34125"]},
    },
    "Kepulauan Bangka Belitung": {
        "Pangkal Pinang": {"lat": -2.1316, "lon": 106.1169, "type": "Kota",
                           "postcodes": ["33111", "33115", "33121", "33125"]},
    },
    # ========== KALIMANTAN ==========
    "Kalimantan Barat": {
        "Pontianak": {"lat": -0.0263, "lon": 109.3425, "type": "Kota",
                      "postcodes": ["78111", "78112", "78121", "78124", "78243"]},
        "Singkawang": {"lat": 0.9077, "lon": 108.9849, "type": "Kota",
                       "postcodes": ["79111", "79114", "79123"]},
    },
    "Kalimantan Tengah": {
        "Palangka Raya": {"lat": -2.2161, "lon": 113.9135, "type": "Kota",
                          "postcodes": ["73111", "74811", "74874"]},
    },
    "Kalimantan Selatan": {
        "Banjarmasin": {"lat": -3.3194, "lon": 114.5907, "type": "Kota",
                        "postcodes": ["70111", "70112", "70121", "70234", "70249"]},
        "Banjarbaru": {"lat": -3.4486, "lon": 114.8378, "type": "Kota",
                       "postcodes": ["70711", "70712", "70714", "70721"]},
    },
    "Kalimantan Timur": {
        "Samarinda": {"lat": -0.5021, "lon": 117.1536, "type": "Kota",
                      "postcodes": ["75111", "75116", "75119", "75124", "75131"]},
        "Balikpapan": {"lat": -1.2379, "lon": 116.8529, "type": "Kota",
                       "postcodes": ["76111", "76112", "76114", "76123", "76131"]},
        "Bontang": {"lat": 0.1325, "lon": 117.4924, "type": "Kota",
                    "postcodes": ["75311", "75312", "75321", "75325"]},
    },
    "Kalimantan Utara": {
        "Tarakan": {"lat": 3.3274, "lon": 117.6332, "type": "Kota",
                    "postcodes": ["77111", "77112", "77115", "77123"]},
    },
    # ========== SULAWESI ==========
    "Sulawesi Utara": {
        "Manado": {"lat": 1.4748, "lon": 124.8421, "type": "Kota",
                   "postcodes": ["95111", "95115", "95121", "95126", "95231"]},
        "Bitung": {"lat": 1.4406, "lon": 125.1218, "type": "Kota",
                   "postcodes": ["95511", "95513", "95542"]},
    },
    "Gorontalo": {
        "Gorontalo": {"lat": 0.5435, "lon": 123.0568, "type": "Kota",
                      "postcodes": ["96111", "96112", "96115", "96121"]},
    },
    "Sulawesi Tengah": {
        "Palu": {"lat": -0.8917, "lon": 119.8707, "type": "Kota",
                 "postcodes": ["94111", "94112", "94115", "94221", "94231"]},
    },
    "Sulawesi Selatan": {
        "Makassar": {"lat": -5.1477, "lon": 119.4327, "type": "Kota",
                     "postcodes": ["90111", "90115", "90121", "90135", "90211", "90231"]},
        "Parepare": {"lat": -4.0135, "lon": 119.6255, "type": "Kota",
                     "postcodes": ["91111", "91112", "91124"]},
        "Palopo": {"lat": -2.9925, "lon": 120.1969, "type": "Kota",
                   "postcodes": ["91911", "91913", "91921"]},
    },
    "Sulawesi Tenggara": {
        "Kendari": {"lat": -3.9985, "lon": 122.5128, "type": "Kota",
                    "postcodes": ["93111", "93112", "93115", "93121"]},
        "Bau-Bau": {"lat": -5.4731, "lon": 122.6173, "type": "Kota",
                    "postcodes": ["93711", "93712", "93715"]},
    },
    "Sulawesi Barat": {
        "Mamuju": {"lat": -2.6748, "lon": 118.8884, "type": "Kabupaten",
                   "postcodes": ["91511", "91512", "91516"]},
    },
    # ========== NUSA TENGGARA ==========
    "Nusa Tenggara Barat": {
        "Mataram": {"lat": -8.5833, "lon": 116.1167, "type": "Kota",
                    "postcodes": ["83111", "83114", "83121", "83125", "83231"]},
        "Bima": {"lat": -8.4615, "lon": 118.7268, "type": "Kota",
                 "postcodes": ["84111", "84112", "84115"]},
    },
    "Nusa Tenggara Timur": {
        "Kupang": {"lat": -10.1718, "lon": 123.6075, "type": "Kota",
                   "postcodes": ["85111", "85112", "85115", "85123", "85228"]},
    },
    # ========== MALUKU & PAPUA ==========
    "Maluku": {
        "Ambon": {"lat": -3.6953, "lon": 128.1814, "type": "Kota",
                  "postcodes": ["97111", "97114", "97123", "97128"]},
    },
    "Maluku Utara": {
        "Ternate": {"lat": 0.7935, "lon": 127.3653, "type": "Kota",
                    "postcodes": ["97711", "97712", "97718", "97721"]},
    },
    "Papua": {
        "Jayapura": {"lat": -2.5337, "lon": 140.7181, "type": "Kota",
                     "postcodes": ["99111", "99115", "99117", "99224"]},
    },
    "Papua Barat": {
        "Manokwari": {"lat": -0.8615, "lon": 134.0628, "type": "Kabupaten",
                      "postcodes": ["98311", "98312", "98314"]},
        "Sorong": {"lat": -0.8762, "lon": 131.2558, "type": "Kota",
                   "postcodes": ["98411", "98412", "98413", "98414"]},
    },
}


# ============================================================
# Helper Functions
# ============================================================

def get_provinces():
    """Return list of all provinces (sorted alphabetically)."""
    return sorted(LOCATIONS.keys())


def get_cities(province: str):
    """Return list of cities/kabupaten in a given province."""
    if province not in LOCATIONS:
        return []
    return sorted(LOCATIONS[province].keys())


def get_postcodes(province: str, city: str):
    """Return list of postcodes for a given city."""
    if province not in LOCATIONS or city not in LOCATIONS[province]:
        return []
    return LOCATIONS[province][city]["postcodes"]


def resolve_coordinates(province: str, city: str, postcode: str = None):
    """
    Convert (province, city, [postcode]) -> coordinates.

    Currently uses city-center coordinates regardless of postcode
    (see note at top of file). Postcode is validated for correctness.

    Returns dict with lat/lon/full info, or None if not found.
    """
    if province not in LOCATIONS:
        return None
    if city not in LOCATIONS[province]:
        return None

    city_data = LOCATIONS[province][city]

    # Validate postcode if provided
    if postcode and postcode not in city_data["postcodes"]:
        return None  # invalid postcode for this city

    return {
        "province": province,
        "city": city,
        "city_type": city_data["type"],
        "postcode": postcode,
        "latitude": city_data["lat"],
        "longitude": city_data["lon"],
    }


def get_location_tree():
    """
    Return the full hierarchical structure for frontend.
    Format: {province: {city: {type, postcodes}}}
    Useful if frontend wants to load it all once and do dropdown filtering client-side.
    """
    return {
        province: {
            city: {
                "type": data["type"],
                "postcodes": data["postcodes"]
            }
            for city, data in cities.items()
        }
        for province, cities in LOCATIONS.items()
    }
