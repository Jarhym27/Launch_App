/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('launch_pads').del()
  await knex('launch_pads').insert(
    [
      {lsp_user_id: 8, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "39A", pad_status: true },
      {lsp_user_id: 4, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "39B", pad_status: true },
      {lsp_user_id: 8, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "LC-13", pad_status: true },
      {lsp_user_id: 9, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "LC-16", pad_status: true },
      {lsp_user_id: 4, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "37B", pad_status: true },
      {lsp_user_id: 8, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "LC-40", pad_status: true },
      {lsp_user_id: 4, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "LC-41", pad_status: true },
      {lsp_user_id: 4, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "LC-41", pad_status: false },
      {lsp_user_id: 6, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "LC-11", pad_status: false },
      {lsp_user_id: 6, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "LC-11", pad_status: false },
      {lsp_user_id: 6, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "LC-11", pad_status: false },
      {lsp_user_id: 7, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "LC-36A", pad_status: false },
      {lsp_user_id: 10, city: "Cocoa Beach", state: "Florida", launch_site: "Patrick SFB", launch_pad: "LC-36B", pad_status: true },
      {lsp_user_id: 7, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "SLC-2", pad_status: true },
      {lsp_user_id: 4, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "SLC-3", pad_status: true },
      {lsp_user_id: 8, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "SLC-4", pad_status: true },
      {lsp_user_id: 4, city: "Lompoc", state: "California", launch_site: "Vandenberg SFB", launch_pad: "SLC-6", pad_status: false },
      {lsp_user_id: 5, city: "Wallops Island", state: "Virginia", launch_site: "Wallops Flight Facility", launch_pad: "LC-0", pad_status: true },
    ]
  );
};
