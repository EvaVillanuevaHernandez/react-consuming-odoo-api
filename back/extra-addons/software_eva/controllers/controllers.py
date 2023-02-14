from odoo import http
from odoo.http import request


class SoftwareEva(http.Controller):

    @http.route('/api/empresas_contratadoras/getAll', type="json", auth="public", csrf=True, cors='*')
    def list(self):
        empresas_contratadoras_rec = request.env['software_eva.empresas_contratadoras'].sudo().search([])
        empresas_contratadoras = []
        for rec in empresas_contratadoras_rec:
            vals = {
                'id': rec.id,
                'name':rec.name,
                'empresa': rec.empresa,
                'contrato': rec.contrato,
                'pago':rec.pago,
                'horas':rec.horas,
                'description':rec.description
            }
            empresas_contratadoras.append(vals)
        return {'status': 200, 'response': empresas_contratadoras, 'message': 'Success'}

    @http.route('/api/empresas_contratadoras/get/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def listOne(self, rec_id):
        model_to_get = request.env['software_eva.empresas_contratadoras']
        rec = model_to_get.browse(rec_id).sudo().ensure_one()
        val = {
            'id': rec.id,
            'name':rec.name,
            'empresa': rec.empresa,
            'contrato': rec.contrato,
            'pago':rec.pago,
            'horas':rec.horas,
            'description':rec.description
        }
        data = {'status': 200, 'response': val, 'message': 'Success'}
        return data
    
    @http.route('/api/empresas_contratadoras/findByEmpresa', type="json", auth="public", csrf=True, cors='*')
    def findByEmpresa(self, **kw):
        data = kw["data"]
        reg_exp = '%' + data['empresa'] + '%'
        empresas_contratadoras_rec = request.env['software_eva.empresas_contratadoras'].sudo().search([('empresa', '=ilike', reg_exp)])
        empresas_contratadoras = []
        for rec in empresas_contratadoras_rec:
            vals = {
                'id': rec.id,
                'name':rec.name,
                'empresa': rec.empresa,
                'contrato': rec.contrato,
                'pago':rec.pago,
                'horas':rec.horas,
                'description':rec.description
            }
            empresas_contratadoras.append(vals)
        return {'status': 200, 'response': empresas_contratadoras, 'message': 'Success'}

    @http.route('/api/empresas_contratadoras/create', type='json', auth='public', csrf=True, cors='*')
    def create(self, **kw):
        data = kw["data"]
        model_to_post = request.env["software_eva.empresas_contratadoras"]
        record = model_to_post.sudo().create(data)
        return record.id
    
    @http.route('/api/empresas_contratadoras/update/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def update(self, rec_id, **kw):
        data = kw["data"]
        model_to_put = request.env["software_eva.empresas_contratadoras"]
        rec = model_to_put.browse(rec_id).sudo().ensure_one()
        record = rec.write(data)
        data = {'status': 200, 'response': record, 'message': 'Success'}
        return data

    @http.route('/api/empresas_contratadoras/remove/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def delete(self, rec_id):
        model_to_del_rec = request.env["software_eva.empresas_contratadoras"]
        rec = model_to_del_rec.browse(rec_id).sudo().ensure_one()
        is_deleted = rec.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data

    @http.route('/api/empresas_contratadoras/removeAll', type='json', auth='public', csrf=True, cors='*')
    def deleteAll(self):
        model_to_del = request.env["software_eva.empresas_contratadoras"].sudo()
        
        # .with_context(active_test=False) to also find inactive records.
        all_empresas_contratadoras = model_to_del.with_context(active_test=False).search([])
        is_deleted = all_empresas_contratadoras.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data