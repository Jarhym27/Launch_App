/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('launch_pads').del()
  await knex('launch_pads').insert(
    [
      { launch_vehicle_id: 23, lsp_user_id: 8, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "81A", pad_status: false },
      { launch_vehicle_id: 18, lsp_user_id: 7, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "78N", pad_status: false },
      { launch_vehicle_id: 3, lsp_user_id: 5, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "41M", pad_status: false },
      { launch_vehicle_id: 23, lsp_user_id: 8, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "12F", pad_status: true },
      { launch_vehicle_id: 19, lsp_user_id: 7, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "48D", pad_status: true },
      { launch_vehicle_id: 6, lsp_user_id: 5, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "62U", pad_status: true },
      { launch_vehicle_id: 7, lsp_user_id: 8, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "59M", pad_status: false },
      { launch_vehicle_id: 3, lsp_user_id: 5, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "27L", pad_status: false },
      { launch_vehicle_id: 21, lsp_user_id: 5, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "45U", pad_status: false },
      { launch_vehicle_id: 19, lsp_user_id: 6, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "75W", pad_status: false },
      { launch_vehicle_id: 2, lsp_user_id: 6, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "79B", pad_status: false },
      { launch_vehicle_id: 20, lsp_user_id: 5, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "60S", pad_status: false },
      { launch_vehicle_id: 3, lsp_user_id: 8, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "12Q", pad_status: false },
      { launch_vehicle_id: 20, lsp_user_id: 6, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "79W", pad_status: true },
      { launch_vehicle_id: 7, lsp_user_id: 4, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "91W", pad_status: false },
      { launch_vehicle_id: 18, lsp_user_id: 6, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "88J", pad_status: false },
      { launch_vehicle_id: 14, lsp_user_id: 8, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "36Y", pad_status: true },
      { launch_vehicle_id: 16, lsp_user_id: 5, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "43S", pad_status: true },
      { launch_vehicle_id: 3, lsp_user_id: 7, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "57M", pad_status: true },
      { launch_vehicle_id: 19, lsp_user_id: 4, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "74E", pad_status: false },
      { launch_vehicle_id: 14, lsp_user_id: 5, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "23Q", pad_status: true },
      { launch_vehicle_id: 21, lsp_user_id: 4, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "65G", pad_status: false },
      { launch_vehicle_id: 9, lsp_user_id: 6, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "06A", pad_status: false },
      { launch_vehicle_id: 4, lsp_user_id: 4, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "05Z", pad_status: false },
      { launch_vehicle_id: 17, lsp_user_id: 7, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "16L", pad_status: false },
      { launch_vehicle_id: 1, lsp_user_id: 8, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "59F", pad_status: true },
      { launch_vehicle_id: 3, lsp_user_id: 4, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "01P", pad_status: true },
      { launch_vehicle_id: 23, lsp_user_id: 5, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "80J", pad_status: false },
      { launch_vehicle_id: 2, lsp_user_id: 6, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "20D", pad_status: true },
      { launch_vehicle_id: 1, lsp_user_id: 7, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "19L", pad_status: true },
      { launch_vehicle_id: 7, lsp_user_id: 5, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "41R", pad_status: true },
      { launch_vehicle_id: 12, lsp_user_id: 5, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "07C", pad_status: false },
      { launch_vehicle_id: 17, lsp_user_id: 4, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "57L", pad_status: false },
      { launch_vehicle_id: 12, lsp_user_id: 7, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "03N", pad_status: false },
      { launch_vehicle_id: 13, lsp_user_id: 7, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "07M", pad_status: false },
      { launch_vehicle_id: 14, lsp_user_id: 6, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "38I", pad_status: false },
      { launch_vehicle_id: 5, lsp_user_id: 5, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "22Q", pad_status: true },
      { launch_vehicle_id: 8, lsp_user_id: 6, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "96T", pad_status: true },
      { launch_vehicle_id: 13, lsp_user_id: 5, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "08M", pad_status: true },
      { launch_vehicle_id: 17, lsp_user_id: 7, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "90S", pad_status: true },
      { launch_vehicle_id: 16, lsp_user_id: 8, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "91X", pad_status: true },
      { launch_vehicle_id: 8, lsp_user_id: 5, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "61Z", pad_status: true },
      { launch_vehicle_id: 1, lsp_user_id: 6, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "45E", pad_status: false },
      { launch_vehicle_id: 14, lsp_user_id: 4, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "18R", pad_status: true },
      { launch_vehicle_id: 20, lsp_user_id: 5, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "12M", pad_status: true },
      { launch_vehicle_id: 21, lsp_user_id: 6, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "98M", pad_status: false },
      { launch_vehicle_id: 24, lsp_user_id: 6, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "38H", pad_status: false },
      { launch_vehicle_id: 13, lsp_user_id: 8, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "25P", pad_status: false },
      { launch_vehicle_id: 15, lsp_user_id: 7, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "70O", pad_status: false },
      { launch_vehicle_id: 15, lsp_user_id: 8, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "24W", pad_status: true }
    ]
  );
};
